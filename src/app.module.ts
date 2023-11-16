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
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ValidationMiddleware } from './middleware/validation-middleware';
import { TrackingModule } from './leadTracking/tracking.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ContactModule,
    TrackingModule,
    TypeOrmModule.forRoot(ormConfig),
  ],
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
