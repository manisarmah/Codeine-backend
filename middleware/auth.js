import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ msg: "Login first" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
