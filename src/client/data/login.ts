import { hashPassword } from "../../server/login";
import type { User } from "../types/login";
import { TAGS } from "./tags";

const user1: User = { 
  email: 'duuhh@aol.com', 
  password: await hashPassword('abc'), 
  userPersonalization: {siteConfig:{ siteName: "Doug's Corner", avatarUrl: '', logoUrl: '' }, 
  tags: [TAGS[0], TAGS[1]]},
};

const user2: User = { 
  email: 'johndoe@gmail.com', 
  password: await hashPassword('xyz123'), 
  userPersonalization: {siteConfig: { siteName: "John's Portfolio", avatarUrl: '', logoUrl: '' },
  tags: [TAGS[0], TAGS[2]]},

};

const user3: User = { 
  email: 'sarah_m@fmail.com', 
  password: await hashPassword('securePass!'), 
  userPersonalization: {
    siteConfig: { siteName: 'a', avatarUrl: '', logoUrl: '' },
    tags: [TAGS[0], TAGS[1], TAGS[2], TAGS[1]]
  },

};
export const users: User[] = [user1, user2, user3];

// export const sessionMap = new Map()

export const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';