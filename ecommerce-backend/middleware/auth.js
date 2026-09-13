import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  try {
    // Get the Authorization header
    const authHeader = req.headers.authorization;

    // Check if the header exists
    if (!authHeader) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    // Get the token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Authentication token missing'
      });
    }

    // Verify the token
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach the decoded user information to the request
    req.user = decodedToken;

    // Continue to the route
    next();

  } catch (error) {
    return res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
}