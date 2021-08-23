import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class AuthUserInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  pass?: string;
}
