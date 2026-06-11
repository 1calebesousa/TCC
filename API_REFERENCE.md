// Este arquivo documenta todas as rotas e payloads da API

// ==================== AUTENTICAÇÃO ====================

// 1. REGISTRAR NOVO USUÁRIO
POST /api/auth/register
Request:
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123",
  "company": "Revenda Silva",
  "phone": "(11) 99999-9999"
}

Response (201):
{
  "message": "Usuário registrado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "company": "Revenda Silva"
  }
}

// 2. LOGIN
POST /api/auth/login
Request:
{
  "email": "joao@exemplo.com",
  "password": "senha123"
}

Response (200):
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "company": "Revenda Silva"
  }
}

// ==================== VEÍCULOS ====================

// 3. LISTAR TODOS OS VEÍCULOS (PÚBLICO)
GET /api/vehicles
Query Params:
  - brand=Toyota (opcional)
  - fuel=Gasolina (opcional)
  - minPrice=20000 (opcional)
  - maxPrice=100000 (opcional)

Response (200):
{
  "total": 42,
  "vehicles": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Toyota Corolla 2022",
      "brand": "Toyota",
      "model": "Corolla",
      "year": 2022,
      "price": 85000,
      "mileage": 35000,
      "fuel": "Gasolina",
      "transmission": "Automática",
      "color": "Preto",
      "doors": 4,
      "description": "Carro impecável",
      "images": [
        {
          "url": "/uploads/vehicle-1234567890.jpg",
          "filename": "vehicle-1234567890.jpg",
          "uploadedAt": "2024-01-15T10:30:00Z"
        }
      ],
      "features": ["Ar condicionado", "Direção hidráulica"],
      "status": "available",
      "owner": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "João Silva",
        "company": "Revenda Silva",
        "phone": "(11) 99999-9999"
      },
      "createdAt": "2024-01-10T14:20:00Z"
    }
  ]
}

// 4. OBTER DETALHES DE UM VEÍCULO (PÚBLICO)
GET /api/vehicles/507f1f77bcf86cd799439012

Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Toyota Corolla 2022",
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2022,
  "price": 85000,
  "mileage": 35000,
  "fuel": "Gasolina",
  "transmission": "Automática",
  "color": "Preto",
  "doors": 4,
  "description": "Carro impecável, revisado, sem danos",
  "images": [...],
  "features": ["Ar condicionado", "Direção hidráulica", "Airbag"],
  "status": "available",
  "owner": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "company": "Revenda Silva",
    "phone": "(11) 99999-9999",
    "email": "joao@exemplo.com"
  },
  "createdAt": "2024-01-10T14:20:00Z",
  "updatedAt": "2024-01-10T14:20:00Z"
}

// 5. CRIAR NOVO VEÍCULO (REQUER AUTENTICAÇÃO)
POST /api/vehicles
Header: Authorization: Bearer {token}

Request:
{
  "title": "Honda Civic 2023",
  "brand": "Honda",
  "model": "Civic",
  "year": 2023,
  "price": 120000,
  "mileage": 15000,
  "fuel": "Gasolina",
  "transmission": "Automática",
  "color": "Branco",
  "doors": 4,
  "description": "Novo, impecável, com todas as revisões",
  "features": ["Ar condicionado automático", "Controle de tração", "ABS", "Airbag frontal e lateral"]
}

Response (201):
{
  "message": "Veículo criado com sucesso",
  "vehicle": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Honda Civic 2023",
    "brand": "Honda",
    "model": "Civic",
    "year": 2023,
    "price": 120000,
    "mileage": 15000,
    "fuel": "Gasolina",
    "transmission": "Automática",
    "color": "Branco",
    "doors": 4,
    "description": "Novo, impecável, com todas as revisões",
    "images": [],
    "features": ["Ar condicionado automático", "Controle de tração", "ABS", "Airbag frontal e lateral"],
    "status": "available",
    "owner": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "João Silva",
      "company": "Revenda Silva"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}

// 6. ATUALIZAR VEÍCULO (REQUER AUTENTICAÇÃO)
PUT /api/vehicles/507f1f77bcf86cd799439013
Header: Authorization: Bearer {token}

Request:
{
  "price": 115000,
  "description": "Promoção! Preço reduzido",
  "status": "reserved"
}

Response (200):
{
  "message": "Veículo atualizado com sucesso",
  "vehicle": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Honda Civic 2023",
    ...
    "price": 115000,
    "description": "Promoção! Preço reduzido",
    "status": "reserved",
    "updatedAt": "2024-01-15T11:45:00Z"
  }
}

// 7. DELETAR VEÍCULO (REQUER AUTENTICAÇÃO)
DELETE /api/vehicles/507f1f77bcf86cd799439013
Header: Authorization: Bearer {token}

Response (200):
{
  "message": "Veículo deletado com sucesso"
}

// 8. UPLOAD DE IMAGENS (REQUER AUTENTICAÇÃO)
POST /api/vehicles/507f1f77bcf86cd799439013/upload
Header: Authorization: Bearer {token}
Content-Type: multipart/form-data

Body: (form-data)
  - images: [arquivo1.jpg, arquivo2.jpg, arquivo3.jpg]

Response (200):
{
  "message": "Imagens enviadas com sucesso",
  "vehicle": {
    "_id": "507f1f77bcf86cd799439013",
    ...
    "images": [
      {
        "url": "/uploads/vehicle-1234567890.jpg",
        "filename": "vehicle-1234567890.jpg",
        "uploadedAt": "2024-01-15T12:00:00Z"
      },
      {
        "url": "/uploads/vehicle-1234567891.jpg",
        "filename": "vehicle-1234567891.jpg",
        "uploadedAt": "2024-01-15T12:00:00Z"
      },
      {
        "url": "/uploads/vehicle-1234567892.jpg",
        "filename": "vehicle-1234567892.jpg",
        "uploadedAt": "2024-01-15T12:00:00Z"
      }
    ]
  }
}

// 9. LISTAR MEUS VEÍCULOS (REQUER AUTENTICAÇÃO)
GET /api/vehicles/user/my-vehicles
Header: Authorization: Bearer {token}

Response (200):
{
  "total": 5,
  "vehicles": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Honda Civic 2023",
      ...
    }
  ]
}

// ==================== CÓDIGOS DE ERRO ====================

// 400 Bad Request - Validação falhou
{
  "errors": [
    {
      "msg": "Título é obrigatório",
      "param": "title"
    }
  ]
}

// 401 Unauthorized - Token inválido/ausente
{
  "message": "Token não fornecido"
}

// 403 Forbidden - Sem permissão
{
  "message": "Você não tem permissão para atualizar este veículo"
}

// 404 Not Found
{
  "message": "Veículo não encontrado"
}

// 500 Server Error
{
  "message": "Erro ao criar veículo",
  "error": "mensagem de erro detalhada"
}
