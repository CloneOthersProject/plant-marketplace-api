import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configs from './config/configs';

import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PlantModule } from './plant/plant.module';
import { CarShopModule } from './car-shop/car-shop.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'trace',
        prettyPrint: {
          translateTime: true,
          colorize: true,
          ignore: 'pid,hostname',
        },
        formatters: {
          level: (label) => ({ level: label }),
        },
        redact: ['req.headers.authorization'],
      },
    }),
    AuthModule,
    ProfileModule,
    PlantModule,
    CarShopModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
