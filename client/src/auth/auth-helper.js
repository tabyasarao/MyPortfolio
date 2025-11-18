// client/src/auth/auth-helper.js

const auth = {
  // Save JWT + user
  authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", jwt.token);
      localStorage.setItem("user", JSON.stringify(jwt.user));
    }
    cb();
  },

  // Check if logged in
  isAuthenticated() {
    if (typeof window == "undefined") return false;

    const token = localStorage.getItem("token");
    return token ? true : false;
  },

  // Get stored user
  getUser() {
    if (typeof window == "undefined") return null;
    return JSON.parse(localStorage.getItem("user"));
  },

  // CLEAR — this is the function your app is missing
  clearAuthData() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
};

export default auth;
