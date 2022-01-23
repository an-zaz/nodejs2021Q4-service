import UserRepository from '../users/user.repository';
import jwt from 'jsonwebtoken';
import {getConnection} from "typeorm";
import config from "../../common/config";

  const login = async (login:string, password: string) => {
    const userRepo =
        getConnection('postgresConnection').getCustomRepository(UserRepository);
    const user = await userRepo.getByLogin( login, password );
    if (!user) {
      return null;
    } else {
      const { id, login } = user;
      return jwt.sign({ id, login }, config.JWT_SECRET_KEY as string);
    }
  }



export default { login };