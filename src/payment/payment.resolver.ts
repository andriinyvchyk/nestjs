import { Controller, Get, UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { User } from '../users/entity/user.entity';
import { TokenGuard } from '../users/guards/token.guard';

@Resolver(of => User)
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService
    ) {}


  @Query(returns => User)
  @UseGuards(TokenGuard)
  createPayment(@Context('req') req) {
    return this.paymentService.createPayment(req.user);
  }
}
