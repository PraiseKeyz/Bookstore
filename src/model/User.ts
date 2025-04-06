import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { NextFunction } from 'express';

// Define interface for the User document
interface IUser extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  comparePassword(enteredPassword: string): Promise<boolean>;
}

// Define the schema for the User model
const userSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  { timestamps: true }
);

// Before saving the user, hash the password
userSchema.pre('save', async function (next: NextFunction) {
  const user = this as IUser; // Casting this to IUser to resolve typing issues
  
  if (!user.isModified('password')) return next(); // Don't hash if password hasn't been modified
  
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt); // Hash the password here
    next();
  } catch (error) {
    next(error); // Pass any error to next
  }
});

// Add method to compare passwords
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model
const User = model<IUser>('User', userSchema);

export default User;
