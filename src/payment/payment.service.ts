import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51JSMI4BmPQpFxDuQtm5otjhCfHjBwBB4LoxOzl0bXLGsow4xJFqjq98o8hV5sqwPlkBJng6eJz05gdrcGqG6Db8W00oWEt7Nar');
import { User } from '../users/entity/user.entity';
import { Repository } from 'typeorm';
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

@Injectable()
export class PaymentService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async createPayment(data) {
    console.log(data)
    const user = await this.usersRepository.findOne({ id : data.id})
    if (!user) throw new NotFoundException(user);

  


    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      payment_method_types: ['card'],
      line_items: [
        {price: 'price_1JSfWgBmPQpFxDuQWnTTYZyu', quantity: 1},
      ],
      mode: 'payment',
    });

    console.log('session', session)

    return 'Hello World!';
  }

}
