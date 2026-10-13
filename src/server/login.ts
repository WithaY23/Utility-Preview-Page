import * as argon2 from "argon2";   

export async function hashPassword(v: string): Promise<string> {
  return await argon2.hash(v);
}
export async function verifyPassword(unhashed:string, hashed:string) : Promise<Boolean>
{
  try {
    
    return await argon2.verify(hashed, unhashed);
  } catch (err) {
    console.error('Error verifying password:', err);
    return false;
  }
}