import express from 'express';
import Item from '../models/Item.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create item (Lost or Found)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, type, location, contact, image } = req.body;

    const item = new Item({
      title,
      description,
      category,
      type,
      location,
      contact,
      image,
      postedBy: req.userId,
    });

    await item.save();

    // Add to user's items
    await User.findByIdAndUpdate(req.userId, {
      $push: { items: item._id },
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const { type, category, search } = req.query;
    let query = {};

    if (type) query.type = type;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const items = await Item.find(query)
      .populate('postedBy', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('postedBy', 'name email phone')
      .populate('claimedBy', 'name email phone');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update item
router.put('/:id', auth, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.postedBy.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete item
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.postedBy.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Item.findByIdAndRemove(req.params.id);

    await User.findByIdAndUpdate(req.userId, {
      $pull: { items: req.params.id },
    });

    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Claim an item
router.post('/:id/claim', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.status !== 'Active') {
      return res.status(400).json({ message: 'Item is not available' });
    }

    item.status = 'Claimed';
    item.claimedBy = req.userId;
    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
