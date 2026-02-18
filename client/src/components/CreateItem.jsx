import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createItem } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateItem.css';

export const CreateItem = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
    type: 'Lost',
    location: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="create-item-container">
        <p>Please <a href="/login">login</a> to post an item</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const itemData = {
        ...formData,
        contact: {
          email: user.email,
          phone: '',
        },
      };
      await createItem(itemData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-item-container">
      <div className="create-form">
        <h2>Post a Lost or Found Item</h2>
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Item Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Describe the item in detail"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Documents">Documents</option>
            <option value="Keys">Keys</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Location where item was lost/found"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Preview" />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItem;
