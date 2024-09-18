
import 'dotenv/config';

const JWT_SECRET = process.env.SECRETKEY;
// Function to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.status(403).json({ error: "Unauthorized" });
      }
      req.user = decoded; // Decoded payload contains user information
      next();
    });
  }

  export default verifyToken;