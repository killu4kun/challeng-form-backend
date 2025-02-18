import { Injectable } from '@nestjs/common';
import { SubmitFormDto } from './submit-form.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FormDocument } from './schemas/form.schema';
import { Model } from 'mongoose';

@Injectable()
export class FormService {
  constructor(@InjectModel('Form') private formModel: Model<FormDocument>) {}

  async submitForm(submitFormDto: SubmitFormDto): Promise<FormDocument> {
    const createdForm = new this.formModel(submitFormDto);
    return createdForm.save();
  }
}
