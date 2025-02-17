import {
  Controller,
  Body,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { FormService } from './form.service';
import { Axios } from 'axios';
import { SubmitFormDto } from './submit-form.dto';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}
  @Post('submit')
  async submitForm(@Body() submitFormDto: SubmitFormDto) {
    try {
      const result = await this.formService.submitForm(submitFormDto);
      return { message: 'Formulário enviado com sucesso!', data: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }
  }
}
