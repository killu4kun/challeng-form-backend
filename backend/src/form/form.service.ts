import { ConflictException, Injectable } from '@nestjs/common';
import { SubmitFormDto } from './submit-form.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FormDocument } from './schemas/form.schema';
import { Model } from 'mongoose';

@Injectable()
export class FormService {
  constructor(
    @InjectModel('Form') private readonly formModel: Model<FormDocument>,
  ) {}

  async submitForm(submitFormDto: SubmitFormDto): Promise<FormDocument> {
    const existingEmail = await this.formModel.findOne({
      email: submitFormDto.email,
    });

    if (existingEmail) {
      throw new ConflictException('Email já cadastrado');
    }

    const createdForm = new this.formModel(submitFormDto);
    return createdForm.save();
  }

  async getForm(): Promise<FormDocument[]> {
    return this.formModel.find().exec();
  }

  async updateForm(
    id: string,
    submitFormDto: SubmitFormDto,
  ): Promise<FormDocument> {
    const existingForm = await this.formModel.findById(id).exec();
    if (!existingForm) {
      throw new ConflictException('Formulário não encontrado');
    }

    const duplicateEmail = await this.formModel
      .findOne({
        email: submitFormDto.email,
        _id: { $ne: id }, // exclui o proprio formulario
      })
      .exec();
    if (duplicateEmail) {
      throw new ConflictException('Email já cadastrado');
    }

    Object.assign(existingForm, submitFormDto);
    return existingForm.save();
  }
}
