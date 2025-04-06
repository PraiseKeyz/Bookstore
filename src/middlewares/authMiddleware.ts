import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/User.js';

dotenv.config();

// Define the expected shape of the decoded JWT payload
interface DecodedToken {
  _id: string; // Adjust this based on your actual JWT payload
}

// Extending the Express Request interface to include `token` and `user`
interface AuthenticatedRequest extends Request {
  token?: string;
  user?: any;  // Replace 'any' with the appropriate type for your user (e.g., `UserType`)
}

const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('Token not found');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as DecodedToken;

    // Find the user based on the decoded _id
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error('User not found');
    }

    req.token = token;
    req.user = user;
    
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate...' });
  }
};

export default auth;
