import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin' | 'contractor';
  createdAt: Date;
  updatedAt: Date;
}

// In-memory user storage
const users: Record<string, IUser> = {};

// Class to handle user operations
class UserService {
  // Find user by email
  static async findOne({ email }: { email: string }): Promise<IUser | null> {
    return Object.values(users).find(user => user.email === email) || null;
  }

  // Find user by ID
  static async findById(id: string): Promise<IUser | null> {
    return users[id] || null;
  }

  // Create a new user
  static async create(userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    const id = uuidv4();
    const now = new Date();
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const newUser: IUser = {
      id,
      ...userData,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now
    };
    
    users[id] = newUser;
    return newUser;
  }

  // Compare password for login
  static async comparePassword(user: IUser, candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, user.password);
  }
}

export default UserService; 