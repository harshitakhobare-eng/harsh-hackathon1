import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/mockApiService';

const ProductDetailScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  
  if (!product) {
      return <h2>Product not found.</h2>
  }

  return (
    <div>
      {/* A more detailed layout would go here */}
      <img src={product.imagePlaceholderUrl} alt={product.title} style={{ maxWidth: '500px', width: '100%' }} />
      <h2>{product.title}</h2>
      <h3>₹{product.price}</h3>
      <p><strong>Category:</strong> {product.category}</p>
      <p>{product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetailScreen;