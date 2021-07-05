import { Module } from '@nestjs/common';
import { knexSnakeCaseMappers } from 'objection';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ObjectionModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        config: {
          ...config.get('database'),
          ...knexSnakeCaseMappers(),
        },
      }),
    }),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule {}
