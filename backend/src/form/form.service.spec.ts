import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FormService } from './form.service';
import { FormDocument } from './schemas/form.schema';
import { Model } from 'mongoose';
import { exec } from 'child_process';

describe('FormService', () => {
  let service: FormService;
  let model: Model<FormDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormService,
        {
          provide: getModelToken('Form'),
          useValue: {
            new: jest.fn().mockImplementation((dto) => dto),
            create: jest.fn().mockResolvedValue({
              _id: '123',
              name: 'Teste',
              email: 'teste@email.com',
              cep: '12345-678',
            }),
            find: jest.fn(),
            findOne: jest.fn().mockResolvedValue(null),
            findByIdAndUpdate: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FormService>(FormService);
    model = module.get<Model<FormDocument>>(getModelToken('Form'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('submitForm', () => {
    it('should throw an error if email already exists', async () => {
      const formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        cep: '12345678',
      };

      jest.spyOn(model, 'findOne').mockResolvedValue(formData as any);

      await expect(service.submitForm(formData)).rejects.toThrow(
        'Email já cadastrado',
      );
    });
  });

  describe('getForms', () => {
    it('should return an array of forms', async () => {
      const forms = [
        {
          name: 'João Silva',
          email: 'joao@example.com',
          cep: '12345678',
        },
      ];

      jest.spyOn(service, 'getForm').mockResolvedValue(forms as any);

      const result = await service.getForm();
      expect(result).toEqual(forms);
      expect(service.getForm).toHaveBeenCalled();
    });
  });

  describe('updateForm', () => {
    it('should update a form', async () => {
      const formId = '64f1b2c3e4b0d8f8f8f8f8f8';
      const formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        cep: '12345678',
      };

      const mockResponse = {
        message: 'Formulário atualizado com sucesso!',
        data: formData,
      };

      jest.spyOn(service, 'updateForm').mockResolvedValue(mockResponse as any);

      const result = await service.updateForm(formId, formData);
      expect(result).toEqual({
        message: 'Formulário atualizado com sucesso!',
        data: formData,
      });
      expect(service.updateForm).toHaveBeenCalledWith(formId, formData);
    });
  });
});
