const create = async (project) => {
  const jwt = auth.isAuthenticated();
  
  try {
    let response = await fetch('/api/project', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt.token 
      },
      body: JSON.stringify(project)
    });
    return await response.json();
  } catch (err) {
    console.log("Error creating project:", err);
  }
};

// 3. UPDATE (Admin Only) - Requires JWT
const update = async (projectId, project) => {
  const jwt = auth.isAuthenticated();
  
  try {
    let response = await fetch('/api/project/' + projectId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt.token
      },
      body: JSON.stringify(project)
    });
    return await response.json();
  } catch (err) {
    console.log("Error updating project:", err);
  }
};

// 4. DELETE (Admin Only) - Requires JWT
const remove = async (projectId) => {
  const jwt = auth.isAuthenticated();
  
  try {
    let response = await fetch('/api/project/' + projectId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt.token
      }
    });
    return await response.json();
  } catch (err) {
    console.log("Error deleting project:", err);
  }
};

export { list, create, update, remove };