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

    /**
     * @deprecated
     * @param context
     */
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }

    async canActivate(context: ExecutionContext) {
        const gqlContext = GqlExecutionContext.create(context).getContext();
        const {req: {headers: {authorization}}} = gqlContext

        if (authorization && (authorization as string).split(' ')[1]) {
            const token = (authorization as string).split(' ')[1];
            gqlContext.req.user = this.jwtService.verify(token);
            if (gqlContext.req.user) {
                return true;
            }
        }

        return false;
    }

}