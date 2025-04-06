import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import dotenv from 'dotenv';
import { Types } from 'mongoose';

dotenv.config();


const signup = async (req: Request , res: Response) => {
    try {
        const user = new User(req.body);
        await user.save()

        const secretKey = process.env.JWT_SECRET_KEY;
        const userId: Types.ObjectId = user._id;
        const token = jwt.sign(
            { _id: userId.toString() },
            secretKey as string,
            { expiresIn: '24h' }
        );

        const { password: _, ...isWithoutPassword } = user.toObject()

        res.status(201).json({message: "Account created successfully", user: isWithoutPassword, token})
    } catch (error) {
        console.error("Error:", error)
        res.status(400).json({ error: "Failed to create account"})
    }
}

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if(!user) {
            res.status(400).json({ meessage: "User not found"})
            return
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            res.status(400).json({ meessage: "Invalid credentials"})   
            return
        }

        const { password: _, ...isWithoutPassword } = user.toObject();
        const userId: Types.ObjectId = user._id;
        const token = jwt.sign(
            { _id: userId.toString() },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '24h' }
        );

        res.status(200).json({message: "Logged in successfully", user: isWithoutPassword, token})
    } catch (error) {
        console.error("Error:", error)
        res.status(400).json({message: "Failed to log in"})
    }
}


export default {login, signup};