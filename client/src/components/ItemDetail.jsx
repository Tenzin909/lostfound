import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItem, claimItem, deleteItem } from '../api/api';
import { useAuth } from '../context/AuthContext';
import '../styles/ItemDetail.css';

export const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await getItem(id);
      setItem(response.data);
    } catch (err) {
      setError('Failed to load item');
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    try {
      await claimItem(id);
      fetchItem();
      alert('Item claimed successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to claim item');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
        navigate('/');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete item');
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div>Item not found</div>;

  const isOwner = user && user.id === item.postedBy._id;

  return (
    <div className="item-detail-container">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to List
      </button>

      <div className="item-detail">
        {item.image && (
          <div className="detail-image">
            <img src={item.image} alt={item.title} />
          </div>
        )}

        <div className="detail-content">
          <div className="detail-header">
            <h1>{item.title}</h1>
            <span className={`status-badge ${item.status.toLowerCase()}`}>
              {item.status}
            </span>
          </div>

          <p className="category-tag">{item.category}</p>

          <div className="detail-info">
            <p>
              <strong>Type:</strong> {item.type}
            </p>
            <p>
              <strong>Location:</strong> {item.location}
            </p>
            <p>
              <strong>Posted by:</strong> {item.postedBy.name}
            </p>
            {item.postedBy.email && (
              <p>
                <strong>Email:</strong> {item.postedBy.email}
              </p>
            )}
            {item.postedBy.phone && (
              <p>
                <strong>Phone:</strong> {item.postedBy.phone}
              </p>
            )}
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>

          <div className="actions">
            {item.status === 'Active' && !isOwner && (
              <button onClick={handleClaim} className="claim-btn">
                Claim This Item
              </button>
            )}
            {isOwner && (
              <button onClick={handleDelete} className="delete-btn">
                Delete Item
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
