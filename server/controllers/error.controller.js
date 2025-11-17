/**
 * dbErrorHandler
 * Returns a human-readable error message from Mongoose / MongoDB errors
 */

function handleError(req, res, err) {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
}

function getErrorMessage(err) {
  let message = "";

  // MongoDB duplicate key error
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }
  // Mongoose validation error
  else if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
        break;
      }
    }
  } 
  // Default error message
  else {
    message = err.message || "Unknown server error";
  }

  return message;
}

export default {
  handleError,
  getErrorMessage,
};
