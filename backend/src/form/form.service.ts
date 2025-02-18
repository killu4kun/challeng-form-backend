import { ConflictException, Injectable } from '@nestjs/common';
import { SubmitFormDto } from './submit-form.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FormDocument } from './schemas/form.schema';
import { Model } from 'mongoose';

@Injectable()
export class FormService {
  constructor(@InjectModel('Form') private formModel: Model<FormDocument>) {}

  async submitForm(submitFormDto: SubmitFormDto): Promise<FormDocument> {
    const existingEmail = await this.formModel
      .findOne({ email: submitFormDto.email })
      .exec();
    if (existingEmail) {
      throw new ConflictException('Email já cadastrado');
    }

    const createdForm = new this.formModel(submitFormDto);
    return createdForm.save();
  }

  async getForm(): Promise<FormDocument[]> {
    return this.formModel.find().exec();
  }
}
