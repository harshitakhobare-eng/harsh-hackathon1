import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem) {
      
      alert(`${product.title} is already in your cart.`);
    } else {
      
      setItems([...items, { ...product, quantity: 1 }]);
      alert(`${product.title} has been added to your cart!`);
    }
  };

  const removeFromCart = (productId) => {
    setItems(items.filter(item => item.id !== productId));
  };

  const clearCart = () => {
      setItems([]);
  }

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};