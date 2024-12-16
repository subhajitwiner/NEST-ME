import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: express.Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    try {
      const [bearer, token] = authHeader.split(' ');
      console.log(request.headers.authorization)
      if (bearer.toLowerCase() !== 'bearer') {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'token format ivalid',
            error: 'Custom error message',
          },
          HttpStatus.FORBIDDEN,
        );
      }
      else{
        try {
          jwt.verify(token,'secret key');
          return true;
        } catch (error) {
          throw new HttpException(
            {
              statusCode: HttpStatus.UNAUTHORIZED,
              message: 'token ivalid',
              error: 'Custom error message',
            },
            HttpStatus.FORBIDDEN,
          );
        }
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'token is not present',
          error: 'Custom error message',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
