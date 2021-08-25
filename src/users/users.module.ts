import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { NewUserInput } from './dto/new-user.input';
import { AuthUserInput } from './dto/auth-user.input';
import { JwtModule } from '@nestjs/jwt';
import { TokenGuard } from './guards/token.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secretOrPrivateKey: 'secret',
      signOptions: {
        expiresIn: 2592000,
      },
    })
  ],
  providers: [
    TokenGuard,

    UsersService,
    UsersResolver,
    NewUserInput,
    AuthUserInput,
  ],
})
export class UsersModule { }
