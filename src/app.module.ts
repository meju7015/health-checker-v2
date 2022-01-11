import { CheckerModule } from './checker/checker.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configurations from './config/configurations';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';
import slackConfig from './config/slack.config';
import { SlackModule } from 'nestjs-slack-webhook';
import { NotifyService } from './notify/notify.service';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations, slackConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: Boolean(process.env.DB_SYNC),
        autoLoadEntities: true,
      }),
    }),
    SlackModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config) => config.get('slack'),
    }),
    ScheduleModule.forRoot(),
    CheckerModule,
    HttpModule,
    TerminusModule,
    TaskModule,
    NotifyModule,
  ],
  controllers: [AppController],
  providers: [NotifyService],
})
export class AppModule {}
