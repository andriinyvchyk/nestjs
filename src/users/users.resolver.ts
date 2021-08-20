import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewUserInput } from './dto/new-user.input';
import { UsersArgs } from './dto/users.args';
import { User } from './models/user.model';
import { UsersService } from './users.service';

const pubSub = new PubSub();

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly recipesService: UsersService) {}

  @Query(returns => User)
  async recipe(@Args('id') id: string): Promise<User> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query(returns => [User])
  recipes(@Args() recipesArgs: UsersArgs): Promise<User[]> {
    return this.recipesService.findAll(recipesArgs);
  }

  @Mutation(returns => User)
  async addRecipe(
    @Args('newRecipeData') newRecipeData: NewUserInput,
  ): Promise<User> {
    const recipe = await this.recipesService.create(newRecipeData);
    pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Mutation(returns => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id);
  }

  @Subscription(returns => User)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded');
  }
}
