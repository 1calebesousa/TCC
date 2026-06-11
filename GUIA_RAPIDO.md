# 📖 Guia de Início Rápido

## 🎯 Objetivo
Criar um site moderno e profissional de revenda de carros que combina:
- Design elegante em preto e vermelho
- Catálogo dinâmico de veículos
- Painel administrativo para publicar veículos
- Funcionalidades OLX-like

## 🏗️ Stack Tecnológico

### Backend
- **Node.js + Express** - Servidor API
- **MongoDB** - Banco de dados
- **JWT** - Autenticação
- **Multer** - Upload de imagens
- **Bcrypt** - Segurança de senha

### Frontend
- **React** - Framework UI
- **Tailwind CSS** - Estilização
- **Vite** - Build tool
- **React Router** - Navegação
- **Axios** - HTTP client

## 📁 Estrutura do Projeto

```
TCC/
├── backend/                 ← API REST
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Vehicle.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── vehicles.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── upload.js
│   │   └── server.js
│   ├── uploads/             ← Imagens dos veículos
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/                ← Interface React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── VehicleCard.jsx
│   │   │   └── VehicleFilters.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx           ← Landing page
│   │   │   ├── Catalog.jsx        ← Listagem
│   │   │   ├── VehicleDetail.jsx  ← Detalhes
│   │   │   ├── Login.jsx          ← Login
│   │   │   ├── Register.jsx       ← Registro
│   │   │   └── Dashboard.jsx      ← Admin
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── api/
│   │   │   └── client.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   ├── Dockerfile
│   └── .gitignore
│
├── docker-compose.yml       ← Orquestração Docker
└── README.md                ← Documentação
```

## 🎨 Características Visuais

### Paleta de Cores
```
🖤 Preto (Primary):     #0a0a0a, #1a1a1a, #2a2a2a, #3a3a3a
❤️ Vermelho (Accent):    #dc2626, #ef4444, #f87171
⚪ Cinza (Text):         #e5e7eb, #d1d5db, #9ca3af
```

### Componentes
- ✨ Cards com hover effects elegantes
- 🎯 Botões com estado ativo/hover
- 📐 Grid responsivo 1/2/3 colunas
- 🖼️ Galeria de imagens interativa
- 🔍 Filtros avançados

## 🔄 Fluxo de Dados

```
Frontend (React)
    ↓
    ├→ Home (Landing Page)
    ├→ Catalog (Listagem pública)
    │   ├→ Filtros
    │   └→ VehicleCards
    ├→ VehicleDetail (Detalhes públicos)
    ├→ Login/Register (Autenticação)
    └→ Dashboard (Admin protegido)
        └→ Gerenciar veículos

API (Express)
    ├→ /api/auth
    │   ├ POST /register
    │   └ POST /login
    └→ /api/vehicles
        ├ GET / (público)
        ├ GET /:id (público)
        ├ POST / (auth)
        ├ PUT /:id (auth)
        ├ DELETE /:id (auth)
        └ POST /:id/upload (auth)

MongoDB
    ├→ Users (email, senha criptografada, empresa)
    └→ Vehicles (título, marca, modelo, imagens, etc)
```

## 🚀 Como Rodar

### Opção 1: Local (Recomendado para desenvolvimento)

**1. Backend**
```bash
cd backend
npm install
npm run dev  # Rodará em http://localhost:5000
```

**2. Frontend** (novo terminal)
```bash
cd frontend
npm install
npm run dev  # Rodará em http://localhost:3000
```

### Opção 2: Docker (Recomendado para produção)
```bash
docker-compose up -d
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: http://localhost:27017
```

## 📊 Dados de Exemplo

### Criar usuário (via API)
```bash
POST http://localhost:5000/api/auth/register
{
  "name": "João Silva",
  "email": "joao@revenda.com",
  "password": "123456",
  "company": "Revenda Silva Motors",
  "phone": "(11) 99999-9999"
}
```

### Criar veículo (via API)
```bash
POST http://localhost:5000/api/vehicles
Authorization: Bearer {token}

{
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
  "features": ["Ar condicionado", "Direção hidráulica", "Airbag"]
}
```

## 🔐 Autenticação

O sistema usa **JWT (JSON Web Token)**:

1. Usuário faz login
2. Backend retorna token
3. Frontend armazena token em localStorage
4. Token é enviado em cada requisição protegida no header:
   ```
   Authorization: Bearer <token>
   ```
5. Backend valida o token antes de processar

## 📱 Funcionalidades por Página

### 🏠 Home
- Banner hero inspirador
- Stats (1000+ veículos, 500+ revendas, etc)
- Features (100% Seguro, Melhor Preço, etc)
- CTA para registrar revenda

### 🚗 Catálogo
- Listagem de veículos em grid
- Filtros (marca, combustível, preço)
- Cards com imagem, preço, características
- Link para detalhes

### 📸 Detalhes do Veículo
- Galeria de fotos com navegação
- Todas as especificações
- Dados do vendedor
- Botão de contato

### 🔑 Login/Registro
- Formulários elegantes
- Validação de entrada
- Redirecionamento após autenticação

### 📊 Dashboard
- Listar meus veículos
- Form para criar novo veículo
- Edit/delete veículos
- Upload de imagens

## ✅ Validações

### Usuário
- Email válido e único
- Senha mínimo 6 caracteres
- Nome, empresa obrigatórios

### Veículo
- Todos os campos obrigatórios preenchidos
- Preço e quilometragem números válidos
- Ano entre 1990 e próximos 5 anos
- Imagens JPEG, PNG, GIF, WebP até 5MB

## 🛡️ Segurança

✅ Senhas criptografadas com bcrypt  
✅ Tokens JWT com expiração  
✅ CORS configurado  
✅ Validação de entrada  
✅ Apenas dono pode editar/deletar  
✅ Uploads validados por tipo MIME  

## 🚀 Próximos Passos (Melhorias Futuras)

- [ ] Sistema de avaliações ⭐
- [ ] Chat com vendedor 💬
- [ ] Agendamento de test drive 📅
- [ ] Integração WhatsApp 📲
- [ ] Sistema de pagamento 💳
- [ ] Histórico de visualizações 👁️
- [ ] Favoritação de anúncios ❤️
- [ ] Notificações de novos anúncios 🔔

## 📞 Suporte

Dúvidas? Consulte o README.md ou abra uma issue.

---

**Projeto completo, moderno e pronto para produção!** 🚀
