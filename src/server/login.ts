import * as argon2 from "argon2";   

export async function hashPassword(v: string): Promise<string> {
  return await argon2.hash(v);
}
export async function verifyPassword(unhashed:string, hashed:string) : Promise<Boolean>
{
    return (await hashPassword(unhashed)) == hashed
}