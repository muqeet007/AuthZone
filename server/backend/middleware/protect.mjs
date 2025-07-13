import { SECRET_KEY } from '../config/config.mjs';
import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  try {
    // const bearerHeader = req.headers['authorization'];

    // 1. Check if token exists and starts with "Bearer"
    // if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
    //   return res.status(401).json({ message: "Login First: No token provided" });
    // }

    // 2. Extract token
    // const token = bearerHeader.split(" ")[1];

//   Read token from cookie  
    const token=req.cookies.token

     if (!token) {
      return res.status(401).json({ message: "Login First: No token provided" });
    }
    // 3. Verify token
    const user = jwt.verify(token, SECRET_KEY);

    // 4. Attach user to request and continue
    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
