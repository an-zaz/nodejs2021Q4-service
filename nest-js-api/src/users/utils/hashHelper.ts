import * as bcrypt from 'bcryptjs';

const DEFAULT_SALT_ROUNDS = 10;

export const hashPassword = async  (password: string) => {
  const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
}


export const checkHashPassword = async ( password: string, passwordHashed: string) => {
  return await bcrypt.compare(password, passwordHashed);
}