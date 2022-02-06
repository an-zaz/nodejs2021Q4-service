import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate( context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const skipAuth = this.reflector.get<boolean>(
      'skip-jwt',
      context.getHandler(),
    );
    if (skipAuth) {
      return true;
    }
    const { authorization } = request.headers;
    if (!authorization) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const [authType, token] = authorization.trim().split(' ');
    if (authType !== 'Bearer') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    } catch (e) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}