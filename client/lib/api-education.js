// client/lib/api-education.js
// Import the authentication helper to retrieve the JWT token
import auth from './auth-helper'; 

// 1. READ ALL (Public Access)
const list = async (signal) => {
  try {
    let response = await fetch('/api/education', {
      method: 'GET',
      signal: signal,
    });
    return await response.json(); 
  } catch (err) {
    console.log(err);
  }
};

// 2. CREATE (Admin Only) - Requires JWT
const create = async (education) => {
  // Get the stored JWT for authorization
  const jwt = auth.isAuthenticated();
  
  try {
    let response = await fetch('/api/education', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Attaching the token for authorization using the Bearer scheme
        'Authorization': 'Bearer ' + jwt.token 
      },
      body: JSON.stringify(education)
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// 3. UPDATE (Admin Only) - Requires JWT
const update = async (eduId, education) => {
  const jwt = auth.isAuthenticated();
  
  try {
    let response = await fetch('/api/education/' + eduId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt.token
      },
      body: JSON.stringify(education)
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// 4. DELETE (Admin Only) - Requires JWT
const remove = async (eduId) => {
  const jwt = auth.isAuthenticated();
  
  try {
    let response = await fetch('/api/education/' + eduId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt.token
      }
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { list, create, update, remove };