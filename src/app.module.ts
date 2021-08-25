import "reflect-metadata";
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
// import { TokenGuard } from './users/guards/token.strategy';
import { TokenGuard } from './users/guards/token.guard';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({req}) => ({...req}),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'nest',
      entities: [
        User
      ],
      synchronize: false,
    }),
    JwtModule.register({
      secretOrPrivateKey: 'secret',
      signOptions: {
        expiresIn: 2592000,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: TokenGuard,
  },],
})
export class AppModule{

}
