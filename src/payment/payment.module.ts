import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import { TokenGuard } from '../users/guards/token.guard';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
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
    PaymentService,
    TokenGuard,
    PaymentResolver
  ],
  controllers: [],
})
export class PaymentModule { }
