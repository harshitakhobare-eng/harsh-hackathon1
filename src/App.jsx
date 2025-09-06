import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductListingFeedScreen from './pages/ProductListingFeedScreen';
import LoginScreen from './pages/Loginscreen';
import SignupScreen from './pages/signupscreen';
import ProductDetailScreen from './pages/ProductDetailScreen'; 

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductListingFeedScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/product/:id" element={<ProductDetailScreen />} /> {/* <-- 2. Add the route */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
