import { Test, TestingModule } from '@nestjs/testing';
import { FormController } from './form.controller';
import { FormService } from './form.service';

describe('FormController', () => {
  let controller: FormController;
  let service: FormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormController],
      providers: [
        {
          provide: FormService,
          useValue: {
            submitForm: jest.fn(),
            getForm: jest.fn(),
            updateForm: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FormController>(FormController);
    service = module.get<FormService>(FormService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('submitForm', () => {
    it('should submit a form', async () => {
      const formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        cep: '12345678',
      };

      jest.spyOn(service, 'submitForm').mockResolvedValue(formData as any);

      const result = await controller.submitForm(formData);
      expect(result).toEqual({
        message: 'Formulário enviado com sucesso!',
        data: formData,
      });
      expect(service.submitForm).toHaveBeenCalledWith(formData);
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

      const result = await controller.getForm();
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

      jest.spyOn(service, 'updateForm').mockResolvedValue(formData as any);

      const result = await controller.updateForm(formId, formData);
      expect(result).toEqual({
        message: 'Formulário atualizado com sucesso!',
        data: formData,
      });
      expect(service.updateForm).toHaveBeenCalledWith(formId, formData);
    });
  });
});
