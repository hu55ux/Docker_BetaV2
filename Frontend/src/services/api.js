const API_URL = 'http://localhost:5267/api'; // production port 8080

export const authService = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/Auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  },
  signUp: async (userData) => {
    const response = await fetch(`${API_URL}/Auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },
};

export default authService;
