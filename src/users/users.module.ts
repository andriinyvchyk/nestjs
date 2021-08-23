import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { NewUserInput } from './dto/new-user.input';
import { AuthUserInput } from './dto/auth-user.input';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver, NewUserInput, AuthUserInput],
})
export class UsersModule {}
