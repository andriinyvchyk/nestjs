import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewUserInput } from './dto/new-user.input';
import { AuthUserInput } from './dto/auth-user.input';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { TokenGuard } from './guards/token.guard';
import { HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import express, {Request, Response} from 'express';

const pubSub = new PubSub();

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) { }

  @Query(returns => [User])
  @UseGuards(TokenGuard)
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Query(returns => User)
  @UseGuards(TokenGuard)
  async me(@Req() req: Request): Promise<User[]> {
    console.log('req', req['user'])
    const users = await this.userService.findAll();
    return users
  }

  @Mutation(returns => User)
  @UseGuards(TokenGuard)
  async create(
    @Args('input') newUserData: NewUserInput,
  ): Promise<User> {
    const user = await this.userService.create(newUserData);
    return user;
  }

  @Mutation(returns => User)
  @UseGuards(TokenGuard)
  async auth(
    @Res() res: Response,
    @Args('input') authUserInput: AuthUserInput,
  ): Promise<User> {
    const user = await this.userService.auth(authUserInput);
    return user;
  }
}
