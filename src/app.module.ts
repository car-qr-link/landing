import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { DataSourceOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionsModule } from './core/subscriptions/subscriptions.module';
import { dataSourceOptions } from './db';

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
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: +(process.env.DB_PORT || 3306),
        username: process.env.DB_USERNAME || 'car-qr-link/landing',
        password: process.env.DB_PASSWORD || 'car-qr-link/landing',
        database: process.env.DB_NAME || 'car-qr-link/landing',
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
