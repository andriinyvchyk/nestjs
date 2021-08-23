import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service'
@Injectable()
export class TokenGuard {

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
        
        ) {

    }
    async use(req: Request, res: Response, next: NextFunction) {
        const authHeaders = req.headers.authorization;
        console.log('nexr')
        if (authHeaders && (authHeaders as string).split(' ')[1]) {
            const token = (authHeaders as string).split(' ')[1];
            const decoded: any = this.jwtService.verify(token);
            const user = await this.usersService.findById(decoded.id);
            console.log('user', user)
            if (!user) {
                throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
            }
            console.log('user', user)
            req['user'] = user;
            next();

        } else {
            throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
        }
    }
}
