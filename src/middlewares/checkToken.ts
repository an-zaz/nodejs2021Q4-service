import config from "../common/config";
import {Exception} from "../common/exception";
import jwt from "jsonwebtoken";
import Koa, {Next} from "koa";

const checkToken = async (ctx: Koa.Context, next: Next) => {
    switch (ctx.request.path) {
        case '/doc':
        case '/login':
        case '/':
            await next();
            return;
    }

    const { authorization } = ctx.headers;

    if (!authorization) {
        throw new Exception('Unauthorized',401);
    }
    const [authType, token] = authorization.trim().split(' ');

    if (authType !== 'Bearer') {
        throw new Exception('Unauthorized',401);
    } else {
        try {
            jwt.verify(token, config.JWT_SECRET_KEY as string)
        } catch (e) {
            throw new Exception('Unauthorized',401);
        }
    }

    await next();
}

export default checkToken;