import UserRepository from '../users/user.repository';
import jwt from 'jsonwebtoken';
import {getConnection} from "typeorm";
import config from "../../common/config";
import { checkHashPassword } from '../../common/hashHelpers';

const login = async (login:string, password: string) => {
  const userRepo =
      getConnection('postgresConnection').getCustomRepository(UserRepository);
  const user = await userRepo.getByLogin( login );
  if (!user) {
    return null;
  } else {
    const { id, login, password: hashedPassword } = user;
    if (!await checkHashPassword(password, hashedPassword)) {
      return null;
    }
    return jwt.sign({ id, login }, config.JWT_SECRET_KEY as string);
  }
}

export default { login };