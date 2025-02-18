import {
  Controller,
  Body,
  Post,
  Get,
  ConflictException,
  Patch,
  Param,
} from '@nestjs/common';
import { FormService } from './form.service';
import { SubmitFormDto } from './submit-form.dto';
import { error } from 'console';

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

  @Patch('/update/:id')
  async updateForm(
    @Param('id') id: string,
    @Body() submitFormDto: SubmitFormDto,
  ) {
    try {
      const updatedForm = await this.formService.updateForm(id, submitFormDto);
      return {
        message: 'Formulário atualizado com sucesso!',
        data: updatedForm,
      };
    } catch (error) {
      throw new ConflictException(error.message);
    }
    throw error;
  }
}
