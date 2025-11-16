import auth from './auth-helper'; 

// 1. CREATE (Public Access) - Anyone can send a message
const create = async (message) => {
  try {
    let response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });
    return await response.json(); 
  } catch (err) {
    console.log("Error sending contact message:", err);
  }
};

// 2. READ ALL (Admin Only) - Requires JWT
const list = async (signal) => {
  const jwt = auth.isAuthenticated();
  try {
    let response = await fetch('/api/contact', {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + jwt.token // Admin auth
      }
    });
    return await response.json(); 
  } catch (err) {
    console.log("Error listing contact messages:", err);
  }
};

// 3. DELETE (Admin Only) - Requires JWT
const remove = async (messageId) => {
  const jwt = auth.isAuthenticated();
  try {
    let response = await fetch('/api/contact/' + messageId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + jwt.token // Admin auth
      }
    });
    return await response.json();
  } catch (err) {
    console.log("Error deleting contact message:", err);
  }
};

export { create, list, remove };