import { mockProducts } from '../_mocks/mockData';

const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async () => {
  await simulateDelay(500); 
  return Promise.resolve(mockProducts);
};

export const getProductById = async (id) => {
  await simulateDelay(300);
  const product = mockProducts.find(p => p.id === parseInt(id));
  if (product) {
    return Promise.resolve(product);
  } else {
    return Promise.reject(new Error('Product not found'));
  }
};

const mockUsers = [
  { id: 1, email: 'test@example.com', username: 'testuser', password: 'password123' }
];

export const login = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 500)); 
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    
    return Promise.resolve({ token: 'fake-jwt-token', user: { id: user.id, username: user.username } });
  } else {
    return Promise.reject(new Error('Invalid email or password'));
  }
};

export const register = async (username, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const existingUser = mockUsers.find(u => u.email === email);
    if(existingUser) {
        return Promise.reject(new Error('User with this email already exists'));
    }
    const newUser = { id: Date.now(), username, email, password };
    mockUsers.push(newUser);
    return Promise.resolve({ token: 'fake-jwt-token', user: { id: newUser.id, username: newUser.username } });
};