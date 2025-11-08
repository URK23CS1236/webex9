// src/services/mockAuth.js
export const mockLogin = async (email, password) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Use the actual email from login
  const userName = email.split('@')[0]; // Extract name from email before @
  
  // Mock successful response with actual user data
  return {
    success: true,
    token: 'mock_jwt_token_' + Date.now(),
    user: {
      _id: 'mock_user_id_' + Date.now(),
      name: userName.charAt(0).toUpperCase() + userName.slice(1), // Capitalize first letter
      email: email // Use the actual email entered
    }
  };
};

export const mockGetCurrentUser = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get the actual user data from localStorage or return mock
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  
  // In a real app, this would come from an API call
  // For mock, we'll return a generic user
  return {
    _id: 'mock_user_id',
    name: 'User', // This will be updated after login
    email: ''
  };
};