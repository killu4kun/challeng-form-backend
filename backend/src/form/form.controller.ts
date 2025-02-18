import {
  Controller,
  Body,
  HttpException,
  HttpStatus,
  Post,
  Get,
  ConflictException,
} from '@nestjs/common';
import { FormService } from './form.service';
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
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Get('get')
  async getForm() {
    return this.formService.getForm();
  }
}
