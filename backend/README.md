# 🛠 Backend

## Visão Geral
O backend foi desenvolvido usando **NestJS** e **MongoDB** (via MongoDB Atlas). Ele gerencia o armazenamento e a validação dos dados do formulário, além de fornecer endpoints para cadastro, listagem e edição.

## 📂 Estrutura de Pastas
```
backend/
├── src/
│   │
│   ├── form/                  # Módulo do formulário
│   │   ├── form.controller.ts # Controlador do formulário
│   │   ├── form.service.ts    # Serviço do formulário
│   │   ├── form.module.ts     # Módulo do formulário
│   │   ├── dto/               # DTOs (Data Transfer Objects)
│   │   │   └── submit-form.dto.ts
│   │   ├── schemas/           # Schemas do MongoDB
│   │   │   └── form.schema.ts
│   │   
│   │          
│   ├── config/                # Configurações do projeto
│   ├── database/              # Configuração do banco de dados
│   ├── app.module.ts          # Módulo principal da aplicação
│   ├── app.controller.ts      # Controller principal
│   └── main.ts                # Ponto de entrada da aplicação
├── test/                      # Testes automatizados
├── .env                       # Variáveis de ambiente
├── .eslintrc.js               # Configuração do ESLint
├── .prettierrc                # Configuração do Prettier
├── nest-cli.json              # Configuração do NestJS CLI
├── package.json               # Dependências e scripts
├── tsconfig.json              # Configuração do TypeScript
└── tsconfig.build.json        # Configuração do TypeScript para build
```

## 🚀 Como Executar
### 1️⃣ Instale as dependências:
```bash
npm install
```

### 2️⃣ Configure o arquivo `.env` com as variáveis de ambiente:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### 3️⃣ Inicie o servidor de desenvolvimento:
```bash
npm run start:dev
```

📌 O backend estará rodando em:
```
http://localhost:3000
```

## 📡 Endpoints
### 🔹 **POST /form/submit** → Envia um novo formulário.
#### 🔸 Body:
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "cep": "12345678"
}
```
#### 🔸 Resposta:
```json
{
  "message": "Formulário enviado com sucesso!",
  "data": {
    "_id": "64f1b2c3e4b0d8f8f8f8f8f8",
    "name": "João Silva",
    "email": "joao@example.com",
    "cep": "12345678"
  }
}
```

### 🔹 **GET /form** → Lista todos os formulários cadastrados.
#### 🔸 Resposta:
```json
[
  {
    "_id": "64f1b2c3e4b0d8f8f8f8f8f8",
    "name": "João Silva",
    "email": "joao@example.com",
    "cep": "12345678"
  }
]
```

### 🔹 **PATCH /form/:id** → Atualiza um formulário existente.
#### 🔸 Body:
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "cep": "12345678"
}
```
#### 🔸 Resposta:
```json
{
  "message": "Formulário atualizado com sucesso!",
  "data": {
    "_id": "64f1b2c3e4b0d8f8f8f8f8f8",
    "name": "João Silva",
    "email": "joao@example.com",
    "cep": "12345678"
  }
}
```

## ✅ Validações
✔ **E-mail único**: Não é possível cadastrar o mesmo e-mail mais de uma vez.
✔ **CEP válido**: O CEP é validado usando a API da BrasilAPI.

## 📦 Dependências Principais
- `@nestjs/mongoose`: Para integração com o MongoDB.
- `mongoose`: Para modelagem de dados no MongoDB.
- `axios`: Para integração com a API da BrasilAPI.
- `class-validator`: Para validação de DTOs.

## 🤝 Como Contribuir
1. Faça um **fork** do repositório.
2. Crie uma **branch** para sua feature:
```bash
git checkout -b minha-feature
```
3. Commit suas mudanças:
```bash
git commit -m 'Adicionando nova feature'
```
4. Envie para o repositório remoto:
```bash
git push origin minha-feature
```
5. Abra um **Pull Request**.

## 📄 Licença
Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais detalhes.

