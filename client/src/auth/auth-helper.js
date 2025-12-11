// client/src/auth/auth-helper.js

const auth = {
 
  authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", jwt.token);
      localStorage.setItem("user", JSON.stringify(jwt.user));
    }
    cb();
  },

  isAuthenticated() {
    if (typeof window == "undefined") return false;

    const token = localStorage.getItem("token");
    return token ? true : false;
  },

  getUser() {
    if (typeof window == "undefined") return null;
    return JSON.parse(localStorage.getItem("user"));
  },

 
  clearAuthData() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
};

export default auth;
