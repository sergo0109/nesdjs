import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from "./users/users.module";
import {ConnectToDbModule} from "./migrations/connectToDb.module";


@Module({
  imports: [ConnectToDbModule,UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
