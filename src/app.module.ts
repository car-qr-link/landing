import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { DataSourceOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionsModule } from './core/subscriptions/subscriptions.module';
import { dataSourceOptions } from './db';
import { URL } from 'url';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        // install 'pino-pretty' package in order to use the following option
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { colorize: true } }
            : undefined,
      },
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_: ConfigService) => ({
        ...dataSourceOptions,
        type: new URL(process.env.DATABASE_URL || dataSourceOptions.url).protocol.replaceAll(':', ''),
        url: process.env.DATABASE_URL,

        synchronize: process.env.NODE_ENV !== 'production',
        migrationsRun: process.env.NODE_ENV === 'production',
      } as unknown as DataSourceOptions)
    }),
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }