import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql';
import { NewUserInput } from './dto/new-user.input';
import { AuthUserInput } from './dto/auth-user.input';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { TokenGuard } from './guards/token.guard';
import { Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) { }

  @Query(returns => User)
  @UseGuards(TokenGuard)
  async balance(@Context('req') req): Promise<User> {
    return this.userService.balance(req.user);
  }

  @Query(returns => [User])
  @UseGuards(TokenGuard)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(returns => User)
  @UseGuards(TokenGuard)
  async me(@Context('req') req): Promise<User> {
    return req.user
  }

  @Mutation(returns => User)
  @UseGuards(TokenGuard)
  async create(
    @Args('input') newUserData: NewUserInput,
  ): Promise<User> {
    return this.userService.create(newUserData);
  }

  @Mutation(returns => User)
  // @UseGuards(TokenGuard)
  async auth(
    @Res() res: Response,
    @Args('input') authUserInput: AuthUserInput,
  ): Promise<User> {
    return this.userService.auth(authUserInput);
  }
}
