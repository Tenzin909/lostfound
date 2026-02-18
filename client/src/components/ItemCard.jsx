import { useNavigate } from 'react-router-dom';
import '../styles/ItemCard.css';

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="item-card">
      {item.image && (
        <img src={item.image} alt={item.title} className="item-image" />
      )}
      <div className="item-content">
        <div className="item-header">
          <h3>{item.title}</h3>
          <span className={`badge ${item.type.toLowerCase()}`}>
            {item.type}
          </span>
        </div>
        <p className="category">{item.category}</p>
        <p className="description">{item.description.substring(0, 100)}...</p>
        <p className="location">📍 {item.location}</p>
        <div className="item-footer">
          <small>Posted by: {item.postedBy?.name}</small>
          <button onClick={() => navigate(`/item/${item._id}`)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
