const bcrypt = require('bcrypt');

export default async function generateHashPassword(pass: string): Promise<string> {
  try {
    const hash = await bcrypt.hash(pass, 10);
    console.log(hash);
    return hash;
  } catch (error) {
    throw error;
  }
}