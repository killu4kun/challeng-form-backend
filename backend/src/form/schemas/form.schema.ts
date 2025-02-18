import { Schema, Document } from 'mongoose';
import { SubmitFormDto } from '../submit-form.dto';

export const FormSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cep: { type: String, required: true },
});

export interface FormDocument extends SubmitFormDto, Document {}
