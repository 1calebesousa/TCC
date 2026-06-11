# 📂 Estrutura Completa do Projeto

## Visualização em Árvore

```
TCC/
│
├── 📋 README.md .......................... Documentação principal
├── 📋 GUIA_RAPIDO.md ................... Guia de início rápido
├── 📋 API_REFERENCE.md ................. Referência completa da API
├── 📋 ESTRUTURA_PROJETO.md ............. Este arquivo
│
├── 🐳 docker-compose.yml ............... Orquestração Docker
│
├── 📁 backend/ .......................... API REST (Node.js)
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js ............ Configuração MongoDB
│   │   │
│   │   ├── models/
│   │   │   ├── User.js ............... Schema de Usuário
│   │   │   └── Vehicle.js ............ Schema de Veículo
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.js ............... Rotas de autenticação
│   │   │   └── vehicles.js ........... Rotas de veículos
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js ............... Autenticação JWT
│   │   │   └── upload.js ............. Configuração Multer
│   │   │
│   │   └── server.js ................. Servidor principal
│   │
│   ├── uploads/ ........................ Armazenamento de imagens
│   ├── package.json ................... Dependências Node
│   ├── .env.example ................... Variáveis de exemplo
│   ├── Dockerfile ..................... Container Docker
│   └── .gitignore ..................... Arquivos ignorados pelo Git
│
├── 📁 frontend/ ......................... App React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx ............ Cabeçalho com navegação
│   │   │   ├── Footer.jsx ............ Rodapé
│   │   │   ├── VehicleCard.jsx ....... Card do veículo
│   │   │   └── VehicleFilters.jsx .... Filtros de busca
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx .............. Landing page
│   │   │   ├── Catalog.jsx ........... Catálogo público
│   │   │   ├── VehicleDetail.jsx ..... Detalhes do veículo
│   │   │   ├── Login.jsx ............. Tela de login
│   │   │   ├── Register.jsx .......... Tela de registro
│   │   │   └── Dashboard.jsx ......... Painel admin
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx ....... Context de autenticação
│   │   │
│   │   ├── api/
│   │   │   └── client.js ............. Cliente HTTP (Axios)
│   │   │
│   │   ├── index.css ................. Estilos globais
│   │   ├── App.jsx ................... Componente raiz
│   │   └── main.jsx .................. Entry point
│   │
│   ├── index.html ..................... HTML template
│   ├── vite.config.js ................. Configuração Vite
│   ├── tailwind.config.js ............. Configuração Tailwind
│   ├── postcss.config.js .............. Configuração PostCSS
│   ├── package.json ................... Dependências Node
│   ├── .env.example ................... Variáveis de exemplo
│   ├── Dockerfile ..................... Container Docker
│   └── .gitignore ..................... Arquivos ignorados
```

## 📝 Detalhamento de Arquivos

### Backend

#### `src/config/database.js`
- Conexão com MongoDB
- Trata erros de conexão
- Logs de sucesso/erro

#### `src/models/User.js`
- Schema de usuário (nome, email, senha, empresa, telefone, papel)
- Middleware para criptografar senha com bcrypt
- Método para comparar senhas

#### `src/models/Vehicle.js`
- Schema de veículo com todos os campos necessários
- Referência para o usuário proprietário
- Array de imagens com data de upload
- Status (available, sold, reserved)

#### `src/routes/auth.js`
- `POST /register` - Registrar novo usuário
- `POST /login` - Autenticar usuário
- Validação com express-validator
- Retorna JWT token

#### `src/routes/vehicles.js`
- `GET /` - Listar veículos (público com filtros)
- `GET /:id` - Detalhes do veículo
- `POST /` - Criar veículo (requer auth)
- `PUT /:id` - Editar veículo (requer auth + proprietário)
- `DELETE /:id` - Deletar veículo
- `POST /:id/upload` - Upload de imagens
- `GET /user/my-vehicles` - Meus veículos

#### `src/middleware/auth.js`
- Middleware de autenticação JWT
- Valida token no header
- Injeta usuário no request

#### `src/middleware/upload.js`
- Configuração do Multer
- Validação de tipos de arquivo
- Limites de tamanho (5MB)
- Salvamento em pasta uploads/

#### `src/server.js`
- Inicializa servidor Express
- Carrega variáveis de ambiente
- Conecta ao MongoDB
- Define rotas e middleware
- Serve arquivos estáticos (imagens)

### Frontend

#### `src/components/Header.jsx`
- Logo da marca
- Menu de navegação
- Links para Catálogo, Dashboard
- Autenticação (Login/Register/Logout)
- Menu responsivo mobile

#### `src/components/Footer.jsx`
- Links rápidos
- Informações de contato
- Copyright

#### `src/components/VehicleCard.jsx`
- Exibe um veículo em formato card
- Imagem principal
- Preço e características
- Ícones dos atributos (combustível, ano, km, portas)
- Link para detalhes

#### `src/components/VehicleFilters.jsx`
- Busca por marca
- Filtros avançados (combustível, preço min/máx)
- Botões Buscar e Limpar
- Responsivo

#### `src/context/AuthContext.jsx`
- Context para gerenciar autenticação
- Funções: login, register, logout
- Armazena token e usuário em localStorage
- Hook useAuth para acessar em qualquer componente

#### `src/api/client.js`
- Configuração do Axios
- Interceptor para adicionar token em requisições
- Métodos para Auth (register, login)
- Métodos para Vehicles (CRUD completo)
- Tratamento de upload de imagens

#### `src/pages/Home.jsx`
- Hero section com chamada à ação
- Stats (1000+ veículos, 500+ revendas, etc)
- Features (Seguro, Melhor Preço, Rápido, Avaliações)
- CTA para registrar revenda

#### `src/pages/Catalog.jsx`
- Integração com VehicleFilters
- Carrega veículos via API
- Grid responsivo de VehicleCards
- Loading e estados de erro

#### `src/pages/VehicleDetail.jsx`
- Galeria interativa de imagens
- Todas as especificações do veículo
- Características listadas
- Informações do vendedor
- Botões de contato

#### `src/pages/Login.jsx`
- Formulário de login elegante
- Validação de entrada
- Tratamento de erros
- Link para registro

#### `src/pages/Register.jsx`
- Formulário de registro completo
- Campos: nome, email, senha, empresa, telefone
- Validação de entrada
- Link para login

#### `src/pages/Dashboard.jsx`
- Lista de meus veículos
- Formulário para criar novo veículo
- Botões para editar/deletar/upload
- Grid responsivo

#### `src/App.jsx`
- Router com todas as rotas
- ProtectedRoute para rotas autenticadas
- AuthProvider wrappando tudo
- Layout com Header, Main, Footer

#### `src/index.css`
- Estilos globais
- Tailwind directives (@tailwind)
- Animações customizadas
- Classes de componentes (btn, card)

## 🔧 Variáveis de Ambiente

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/autorevenda
JWT_SECRET=sua_chave_secreta_super_segura_aqui
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

## 📦 Dependências Principais

### Backend
- `express` - Framework web
- `mongoose` - ODM MongoDB
- `dotenv` - Variáveis de ambiente
- `jsonwebtoken` - Autenticação
- `bcryptjs` - Hash de senhas
- `multer` - Upload de arquivos
- `cors` - CORS middleware
- `express-validator` - Validação

### Frontend
- `react` - UI library
- `react-dom` - Renderização React
- `react-router-dom` - Roteamento
- `axios` - HTTP client
- `lucide-react` - Ícones
- `tailwindcss` - CSS framework
- `vite` - Build tool

## 🚀 Fluxo de Desenvolvimento

1. **Editar código** no VS Code
2. **Servidor dev** atualiza automaticamente (com nodemon/hot reload)
3. **Testar via frontend** em http://localhost:3000
4. **Debugar API** consultando logs do backend

## 🧪 Como Testar

### Teste Manual (Postman/Insomnia)

1. **Registrar**
   ```
   POST http://localhost:5000/api/auth/register
   ```

2. **Login**
   ```
   POST http://localhost:5000/api/auth/login
   ```

3. **Criar Veículo**
   ```
   POST http://localhost:5000/api/vehicles
   Header: Authorization: Bearer {token}
   ```

4. **Upload de Imagens**
   ```
   POST http://localhost:5000/api/vehicles/{id}/upload
   Header: Authorization: Bearer {token}
   Body: form-data com images
   ```

### Teste via Interface
1. Acesse http://localhost:3000
2. Clique em "Registrar"
3. Preencha formulário
4. Vá para Dashboard
5. Crie um veículo
6. Faça upload de fotos
7. Volte ao Catálogo para ver listado

## 📊 Arquitetura MVC

```
Frontend (View)
    ↓
Componentes React
    ↓
Contexto + Estado
    ↓
API Client (Axios)
    ↓
Backend (Controller)
    ↓
Modelos (Mongoose)
    ↓
Banco de Dados (MongoDB)
```

## 🔐 Segurança

✅ Senhas criptografadas com bcrypt  
✅ Autenticação JWT com expiração  
✅ CORS restritivo  
✅ Validação de entrada server-side  
✅ Apenas proprietário pode editar  
✅ Validação de tipos de arquivo  
✅ Limites de tamanho de upload  

---

**Estrutura completa, escalável e pronta para produção!** 🚀
