import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FormService } from './form.service';
import { FormDocument } from './schemas/form.schema';
import { Model } from 'mongoose';

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
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
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
    it('should create a new form', async () => {
      const formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        cep: '12345678',
      };

      jest.spyOn(model, 'create').mockResolvedValue(formData as any);

      const result = await service.submitForm(formData);
      expect(result).toEqual(formData);
      expect(model.create).toHaveBeenCalledWith(formData);
    });

    it('should throw an error if email already exists', async () => {
      const formData = {
        name: 'João Silva',
        email: 'joao@example.com',
        cep: '12345678',
      };

      jest.spyOn(model, 'findOne').mockResolvedValue(formData as any);

      await expect(service.submitForm(formData)).rejects.toThrow(
        'Este e-mail já está cadastrado.',
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

      jest.spyOn(model, 'find').mockResolvedValue(forms as any);

      const result = await service.getForm();
      expect(result).toEqual(forms);
      expect(model.find).toHaveBeenCalled();
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

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(formData as any);

      const result = await service.updateForm(formId, formData);
      expect(result).toEqual(formData);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(formId, formData, {
        new: true,
      });
    });
  });
});
