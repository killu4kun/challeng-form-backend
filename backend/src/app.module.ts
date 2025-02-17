import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormModule } from './form/form.module';
import { MongoModule } from './database/mongo/mongo.module';

@Module({
  imports: [FormModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
