import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from 'src/config/database.config';

@Module({
  imports: [MongooseModule.forRoot(databaseConfig.uri)],
})
export class MongoModule {}
