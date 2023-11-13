import bcrypt from 'bcrypt';

export default async function generateHashPassword(pass: string): Promise<string> {
  try {
    const hash = await bcrypt.hash(pass, 10);
    return hash;
  } catch (error) {
    throw error;
  }
}