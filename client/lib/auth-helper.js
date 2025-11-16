// client/lib/auth-helper.js

const auth = {
  // Method to store JWT (token + user object) after successful sign-in
  authenticate(jwt, cb) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jwt', JSON.stringify(jwt));
    }
    cb();
  },

  // Method to check if a user is currently signed in
  isAuthenticated() {
    if (typeof window == 'undefined') {
      return false;
    }
    if (sessionStorage.getItem('jwt')) {
      // Returns the stored object: { token: '...', user: { _id: '...', role: 'admin' } }
      return JSON.parse(sessionStorage.getItem('jwt'));
    } else {
      return false;
    }
  },

  // Method to clear JWT upon sign-out
  clearJWT(cb) {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('jwt');
    }
    cb();
    // Optional: Sign out/redirect logic
  }
};

export default auth;