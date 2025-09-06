import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">

      <div className="product-card-info">
        <h3>{product.title}</h3>
        <p>₹{product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;