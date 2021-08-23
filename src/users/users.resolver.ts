import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewUserInput } from './dto/new-user.input';
import { AuthUserInput } from './dto/auth-user.input';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';

const pubSub = new PubSub();

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) { }

  @Query(returns => [User])
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Mutation(returns => User)
  async create(
    @Args('input') newUserData: NewUserInput,
  ): Promise<User> {
    const user = await this.userService.create(newUserData);
    return user;
  }

  @Mutation(returns => User)
  async auth(
    @Args('input') authUserInput: AuthUserInput,
  ): Promise<User> {
    const user = await this.userService.auth(authUserInput);
    return user;
  }
}
