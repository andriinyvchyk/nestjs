import { Entity, Column, PrimaryGeneratedColumn,PrimaryColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
    
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  pass: string;

  @Field({defaultValue: 1000 })
  @Column()
  balance : number;

}