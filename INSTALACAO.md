# 🚀 Guia de Instalação - AutoRevenda

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** v16+ ([nodejs.org](https://nodejs.org))
- **npm** ou **yarn** (vem com Node.js)
- **MongoDB** (Local ou Cloud - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** (opcional, para versionamento)

### Verificar Instalações

```bash
node --version  # Deve ser v16 ou superior
npm --version   # Deve ser v7 ou superior
```

---

## 🛠️ Passo 1: Preparar o Ambiente

### 1.1 Clonar o Repositório (se existente)
```bash
git clone <seu-repositorio-url>
cd TCC
```

### 1.2 Ou Navegar até a Pasta Existente
```bash
cd /workspaces/TCC
```

---

## ⚙️ Passo 2: Configurar Backend

### 2.1 Navegar até a pasta backend
```bash
cd backend
```

### 2.2 Instalar Dependências
```bash
npm install
```

Isso vai instalar:
- express
- mongoose
- dotenv
- bcryptjs
- jsonwebtoken
- multer
- cors
- express-validator

### 2.3 Configurar Variáveis de Ambiente

**Copiar arquivo de exemplo:**
```bash
cp .env.example .env
```

**Editar o arquivo `.env`:**
```bash
# Linux/Mac
nano .env

# Windows (use o Notepad)
notepad .env
```

**Configurar as variáveis:**
```env
# Banco de Dados (use uma das opções abaixo)

# Opção 1: MongoDB Local
MONGODB_URI=mongodb://localhost:27017/autorevenda

# Opção 2: MongoDB Atlas (Cloud) - Substitua com sua URL
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/autorevenda?retryWrites=true&w=majority

# Autenticação
JWT_SECRET=sua_chave_secreta_super_segura_e_unica_aqui_123456

# Servidor
PORT=5000
NODE_ENV=development
```

### 2.4 Iniciar o Servidor Backend

**Modo Desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Modo Produção:**
```bash
npm start
```

✅ Você deve ver: `🚀 Servidor rodando em http://localhost:5000`

---

## ⚙️ Passo 3: Configurar Frontend

### 3.1 Em um novo terminal, navegar até frontend
```bash
cd frontend
```

### 3.2 Instalar Dependências
```bash
npm install
```

Isso vai instalar:
- react
- react-dom
- react-router-dom
- axios
- lucide-react
- tailwindcss
- vite

### 3.3 Configurar Variáveis de Ambiente

**Criar arquivo `.env.local`:**
```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
```

Ou editar manualmente com seu editor favorito.

### 3.4 Iniciar o Servidor Frontend

```bash
npm run dev
```

✅ Você deve ver: `VITE ... Local: http://localhost:5000`

---

## 🌐 Passo 4: Acessar a Aplicação

Agora que tudo está rodando:

1. **Frontend**: [http://localhost:3000](http://localhost:3000)
2. **Backend API**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📊 Passo 5: Testar a Aplicação

### 5.1 Ir para Home
Acesse http://localhost:3000 e veja a landing page.

### 5.2 Registrar uma Nova Conta
1. Clique em "Registrar"
2. Preencha os dados:
   - Nome: seu nome
   - Email: seu@email.com
   - Empresa: sua revenda
   - Telefone: seu telefone
   - Senha: mínimo 6 caracteres
3. Clique em "Criar Conta"

### 5.3 Fazer Login
1. Você será redirecionado para o Dashboard
2. Se não, vá para "Entrar" e use suas credenciais

### 5.4 Criar um Veículo
1. No Dashboard, clique em "Adicionar Veículo"
2. Preencha os dados (todos os campos com *)
3. Clique em "Publicar Veículo"

### 5.5 Fazer Upload de Fotos
1. Na lista de veículos do Dashboard
2. Clique no botão "Fotos"
3. Selecione até 10 imagens (JPEG, PNG, GIF, WebP)

### 5.6 Ver Veículo no Catálogo
1. Clique em "Catálogo" no menu
2. Procure pelo seu veículo
3. Clique para ver os detalhes completos

---

## 🐳 Passo 6: (Alternativo) Usar Docker

### 6.1 Pré-requisitos Docker
- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado

### 6.2 Construir e Executar

```bash
# Do diretório TCC
docker-compose up -d
```

Isso vai criar 3 containers:
- **MongoDB** (porta 27017)
- **Backend** (porta 5000)
- **Frontend** (porta 3000)

### 6.3 Verificar Status
```bash
docker-compose ps
```

### 6.4 Ver Logs
```bash
# Todos
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Apenas frontend
docker-compose logs -f frontend
```

### 6.5 Parar
```bash
docker-compose down
```

---

## 🔧 Troubleshooting

### ❌ "MongoDB connection failed"
**Solução:**
- Certifique-se que MongoDB está rodando (se local)
- Verifique a URL em `.env`
- Teste a conexão no MongoDB Atlas

### ❌ "Port 5000 already in use"
**Solução:**
```bash
# Encontre qual processo está usando a porta
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Mude a porta em .env
PORT=5001
```

### ❌ "Port 3000 already in use"
**Solução:**
```bash
# Mude em vite.config.js
server: {
  port: 3001,
  // ...
}
```

### ❌ "npm: command not found"
**Solução:**
- Node.js não está instalado
- Instale de: [nodejs.org](https://nodejs.org)

### ❌ "VITE not found"
**Solução:**
```bash
cd frontend
npm install
```

### ❌ "Erro de CORS"
**Solução:**
- Verifique se backend está rodando
- Verifique VITE_API_URL em .env.local
- Verifique se a URL do frontend está permitida no CORS (backend)

---

## 📚 Comandos Úteis

### Backend
```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Rodar em produção
npm start

# Ver logs
npm run dev

# Parar servidor
Ctrl + C
```

### Frontend
```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### Banco de Dados
```bash
# MongoDB Local - iniciar daemon
# Mac/Linux com Homebrew
brew services start mongodb-community

# Windows (se instalado via MSI)
net start MongoDB

# Verificar conexão
mongosh
```

---

## 🌍 Próximos Passos: Deploy

### Deploy Backend (Railway)

1. Crie conta em [railway.app](https://railway.app)
2. Conecte seu GitHub
3. Importe o projeto
4. Defina variáveis de ambiente
5. Deploy automático

### Deploy Frontend (Vercel)

1. Crie conta em [vercel.com](https://vercel.com)
2. Importe o repositório
3. Configure variável VITE_API_URL com URL do backend
4. Deploy com um clique

### Deploy Database (MongoDB Atlas)

1. Crie cluster em [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Obtenha connection string
3. Use em MONGODB_URI no railway

---

## ✅ Verificação Final

Após instalação, você deve ter:

- [x] Backend rodando em http://localhost:5000
- [x] Frontend rodando em http://localhost:3000
- [x] MongoDB conectado
- [x] Arquivo .env configurado
- [x] Arquivo .env.local configurado
- [x] Conseguir acessar home page
- [x] Conseguir fazer login/registro
- [x] Conseguir criar veículo
- [x] Conseguir fazer upload de foto
- [x] Conseguir ver veículo no catálogo

---

## 📞 Suporte

Se tiver problemas:

1. **Leia os Guias**: README.md, GUIA_RAPIDO.md
2. **Consulte a Referência**: API_REFERENCE.md
3. **Verifique o Checklist**: CHECKLIST_IMPLEMENTACAO.md
4. **Veja a Estrutura**: ESTRUTURA_PROJETO.md

---

**🎉 Parabéns! Você tem a AutoRevenda rodando!**

Agora customize, adicione features e compartilhe com o mundo! 🚀
