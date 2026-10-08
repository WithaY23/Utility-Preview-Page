import { hashPassword } from "../../server/login";
import type { User } from "../types/login";

const user1: User = { 
  email: 'duuhh@aol.com', 
  password: await hashPassword('abc'), 
  siteConfig: { siteName: "Doug's Corner", avatarUrl: '', logoUrl: '' } 
};

const user2: User = { 
  email: 'johndoe@gmail.com', 
  password: await hashPassword('xyz123'), 
  siteConfig: { siteName: "John's Portfolio", avatarUrl: '', logoUrl: '' } 
};

const user3: User = { 
  email: 'sarah_m@fmail.com', 
  password: await hashPassword('securePass!'), 
  siteConfig: { siteName: 'a', avatarUrl: '', logoUrl: '' } 
};
export const users: User[] = [user1, user2, user3];

// export const sessionMap = new Map()

export const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';