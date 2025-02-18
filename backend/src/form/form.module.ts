import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { FormSchema } from './schemas/form.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Form', schema: FormSchema }])],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
