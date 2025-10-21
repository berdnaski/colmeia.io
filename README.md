# 🐝 Colmeia.io - Sistema de Pagamentos

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
</p>

Uma API RESTful robusta para sistema de pagamentos simplificado, desenvolvida com NestJS e TypeScript. Suporta cadastro de clientes e criação de cobranças com três métodos de pagamento: **PIX**, **Cartão de Crédito** e **Boleto Bancário**.

## 🚀 Funcionalidades

### ✅ Implementadas
- 👥 **Cadastro de Clientes** - CRUD completo com validações
- 💳 **Gestão de Cobranças** - Criação e acompanhamento de pagamentos
- 🔄 **Idempotência** - Controle via `transactionId`
- 📊 **Três Métodos de Pagamento**:
  - 🏦 **Boleto** - Com data de vencimento
  - 💳 **Cartão de Crédito** - Com parcelamento (1-12x)
  - ⚡ **PIX** - Processamento instantâneo
- 📝 **Documentação Swagger (Scalar)** - Interface interativa da API
- 🛡️ **Validações Robustas** - Class-validator e DTOs
- 🗄️ **Banco Relacional** - PostgreSQL com Prisma ORM

## ⚙️ Regras de Negócio Importantes

- Uma cobrança **não pode ser atualizada** se estiver com status `EXPIRED`.
- Uma cobrança que já foi **paga (`PAID`)** não pode voltar a outro status (ex: `FAILED`, `PENDING`).
- Cobranças com status `PENDING` expiram automaticamente após o vencimento (`dueDate`).

## 🛠️ Tecnologias

- **Framework**: NestJS 11.x
- **Linguagem**: TypeScript 5.x
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma 6.x
- **Documentação**: Swagger/OpenAPI
- **Validação**: Class-validator
- **Arquitetura**: Clean Architecture

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL 12+
- npm ou yarn
- Docker + Docker Compose

## ⚙️ Configuração do Ambiente

### 1. Clone o repositório
```bash
git clone https://github.com/berdnaski/colmeia.io.git
cd colmeia.io
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados com Docker Compose
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    container_name: colmeia_postgres
    restart: always
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: colmeia.io_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 4. Configure o arquivo `.env`
```env
DATABASE_URL="postgresql://user:password@localhost:5432/colmeia.io_db?schema=public"
PORT=3000
```

### 5. Execute as migrações
```bash
npx prisma migrate dev
npx prisma generate
```

### 6. Inicie o servidor
```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## 📖 Documentação da API

Após iniciar o servidor, acesse:
- **Swagger UI**: http://localhost:3000/docs
- **Scalar Docs**: http://localhost:3000/scalar

## 🧪 Exemplos de Uso

### 1. Criar Cliente
```bash
POST /customers
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "document": "12345678901",
  "phone": "+5511999999999"
}
```

### 2. Criar Cobrança - Boleto
```bash
POST /charges/{customerId}/charges
Content-Type: application/json

{
  "amount": 150.00,
  "currency": "BRL",
  "paymentMethod": "BOLETO",
  "dueDate": "2024-12-31T23:59:59Z",
  "transactionId": "boleto_123456"
}
```

### 3. Criar Cobrança - Cartão de Crédito
```bash
POST /charges/{customerId}/charges
Content-Type: application/json

{
  "amount": 299.90,
  "currency": "BRL",
  "paymentMethod": "CREDIT_CARD",
  "installments": 3,
  "transactionId": "card_789012"
}
```

### 4. Criar Cobrança - PIX
```bash
POST /charges/{customerId}/charges
Content-Type: application/json

{
  "amount": 50.00,
  "currency": "BRL",
  "paymentMethod": "PIX",
  "transactionId": "pix_345678"
}
```

### 5. Atualizar Status da Cobrança
```bash
PATCH /charges/{chargeId}/status
Content-Type: application/json

{
  "status": "PAID"
}
```

### 6. Listar Cobranças do Cliente
```bash
GET /charges/customer/{customerId}
```

## 🏗️ Arquitetura

```
src/
├── modules/
│   ├── customers/
│   │   ├── application/     # Use Cases
│   │   ├── domain/          # Entidades e Interfaces
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── infra/           # Repositórios e Adapters
│   │   └── customers.controller.ts
│   └── charges/
│       ├── application/     # Use Cases
│       ├── domain/          # Entidades e Interfaces
│       ├── dto/             # Data Transfer Objects
│       ├── infra/           # Repositórios e Adapters
│       └── charges.controller.ts
└── shared/
    ├── filters/             # Filtros Globais
    └── infra/               # Infraestrutura Compartilhada
```

## 📊 Status dos Pagamentos

| Status | Descrição |
|--------|-----------|
| `PENDING` | Cobrança criada, aguardando pagamento |
| `PAID` | Pagamento confirmado |
| `FAILED` | Falha no processamento |
| `EXPIRED` | Cobrança expirada |

## 🔮 Roadmap - Melhorias Futuras

### 🔐 Autenticação e Autorização
- [ ] JWT Authentication
- [ ] Role-based Access Control (RBAC)
- [ ] API Keys para integrações

### 🚀 Performance e Escalabilidade
- [ ] **Redis** para cache de consultas frequentes
- [ ] **Paginação** e filtros avançados
- [ ] **Rate Limiting** por IP/usuário
- [ ] **Database Indexing** otimizado

### 🔌 Integrações
- [ ] **Gateway de Pagamento Real**
  - Stripe
  - PagSeguro
  - Mercado Pago
- [ ] **Webhooks** para notificações
- [ ] **Filas** (Bull/Redis) para processamento assíncrono


### 🛡️ Segurança
- [ ] **CORS** configurável
- [ ] **Validação de CPF/CNPJ**
- [ ] **Criptografia** de dados sensíveis

### 🧪 Qualidade
- [ ] **Testes de Integração** completos

## 👨‍💻 Autor

**Erick Berdnaski**
- GitHub: [@berdnaski]https://github.com/berdnaski)
- LinkedIn: [Erick Berdnaski](https://www.linkedin.com/in/erick-berdnaski/)

---

<p align="center">
  Feito com ❤️ e ☕ por <a href="https://github.com/berdnaski">Erick Berdnaski</a>
</p>