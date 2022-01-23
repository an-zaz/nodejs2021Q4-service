import config from "./config";
import {Exception} from "./exception";
import jwt from "jsonwebtoken";
import Koa, {Next} from "koa";

const checkToken = async (ctx: Koa.Context, next: Next) => {
    switch (ctx.request.path) {
        case '/doc':
        case '/login':
            await next();
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
            const claim = jwt.verify(token, config.JWT_SECRET_KEY as string)
        } catch (e) {
            throw new Exception('Unauthorized',401);
        }
        await next();
    }

    await next();
}

export default checkToken;