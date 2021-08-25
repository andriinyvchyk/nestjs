import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service';
import { Request, Response, NextFunction } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()

export class TokenGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
    ) {

    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }

    async canActivate(context: ExecutionContext) {
        const authHeaders = context.getArgs()[2].req.headers.authorization as string;

        if (authHeaders && (authHeaders as string).split(' ')[1]) {
            const token = (authHeaders as string).split(' ')[1];
            const decoded: any = this.jwtService.verify(token);
            context.getArgs()[2].req['user'] = decoded;
            if (context.getArgs()[2].req['user']) {
                return true;
            }
        }

        return false;

    }

}