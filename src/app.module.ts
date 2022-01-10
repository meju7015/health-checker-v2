import { CheckerModule } from './checker/checker.module';
import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [CheckerModule, MoviesModule],
  controllers: [AppController],
})
export class AppModule {}
