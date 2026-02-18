import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Electronics', 'Clothing', 'Accessories', 'Documents', 'Keys', 'Other'],
      required: true,
    },
    type: {
      type: String,
      enum: ['Lost', 'Found'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contact: {
      email: String,
      phone: String,
    },
    status: {
      type: String,
      enum: ['Active', 'Claimed', 'Resolved'],
      default: 'Active',
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Item', itemSchema);
