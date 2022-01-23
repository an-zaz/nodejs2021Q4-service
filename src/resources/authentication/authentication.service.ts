import UserRepository from '../users/user.repository';
import jwt from 'jsonwebtoken';
import {getConnection} from "typeorm";
import {SECRET_KEY} from "./constants";

  const login = async (login:string, password: string) => {
    const userRepo =
        getConnection('postgresConnection').getCustomRepository(UserRepository);
    const user = await userRepo.getByLogin( login, password );
    if (!user) {
      return null;
    } else {
      const { id, login } = user;
      return jwt.sign({ id, login }, SECRET_KEY);
    }
  }



export default { login };