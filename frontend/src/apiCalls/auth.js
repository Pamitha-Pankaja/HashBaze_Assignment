// Function to handle login
const login = async (email, password) => {
  const response = await fetch('http://localhost:8000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};

// Function to handle registration
const register = async (name, email, password) => {
  const response = await fetch('http://localhost:8000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  return await response.json();
};

//function to validate token
const validateToken = async (token) => {
  try {
    const response = await fetch('http://localhost:8000/api/protected', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Invalid token');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
};

export { login, register, validateToken };
