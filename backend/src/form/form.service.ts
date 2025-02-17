import { Injectable } from '@nestjs/common';
import { SubmitFormDto } from './submit-form.dto';
import { Axios } from 'axios';

@Injectable()
export class FormService {
  private axios = new Axios();

  async submitForm(submitFormDto: SubmitFormDto) {
    const { name, email, cep } = submitFormDto;
    const response = await this.axios.get(
      `https://brasilapi.com.br/api/cep/v1/${cep}`,
    );

    if (response.status !== 200 || response.data.erro) {
      throw new Error('CEP inválido');
    }

    return { name, email, cep };
  }
}
