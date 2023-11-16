import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { ContactModule } from './contact/contact.module';
<<<<<<< HEAD
import { TrackingModule } from './leadTracking/tracking.module';

@Module({
  imports: [ContactModule, TrackingModule, TypeOrmModule.forRoot(ormConfig)],
=======
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ValidationMiddleware } from './middleware/validation-middleware';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ContactModule,
    TypeOrmModule.forRoot(ormConfig),
  ],
>>>>>>> 7e1a9247303be3b25050acd74377835915efbbb4
  controllers: [AppController],
  providers: [AppService],
})
// middleware for every path to validate the data
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
