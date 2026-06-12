# 🔐 Auth JWT Study

Sistema de autenticação completo com cadastro, login e proteção de rotas usando JWT.

## 💡 Problema resolvido

Implementação prática de um fluxo real de autenticação: o usuário se cadastra com email e senha, as credenciais são armazenadas com segurança no banco de dados, e o acesso a rotas protegidas é controlado por token JWT com expiração.

## 🚀 Como rodar

**1. Clone o repositório**

git clone https://github.com/felipedev56/auth-jwt-study.git
cd auth-jwt-study

**2. Configure o banco de dados**

Crie um arquivo `.env` dentro da pasta `backend` com sua connection string do PostgreSQL:

DATABASE_URL="postgresql://usuario:senha@host/banco"

**3. Instale as dependências e rode as migrations**

cd backend
npm install
npx prisma migrate dev

**4. Inicie o servidor**

node server.js

**5. Abra o frontend**

Abra o arquivo `frontend/index.html` no navegador (ou use o Live Server).

## 📁 Estrutura do projeto

auth-jwt-study/
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/         # Histórico de migrations
│   │   └── schema.prisma       # Model do banco de dados
│   │
│   ├── server.js               # Servidor Express com todas as rotas
│   ├── .env                    # Variáveis de ambiente (não commitado)
│   └── package.json
│
├── frontend/
│   ├── css/
│   │   └── style.css           # Estilos globais
│   ├── img/
│   │   └── logo-github.png
│   ├── js/
│   │   ├── main.js             # Lógica da página de login
│   │   ├── register.js         # Lógica da página de cadastro
│   │   └── home.js             # Lógica da página protegida
│   ├── index.html              # Página de login
│   ├── register.html           # Página de cadastro
│   └── home.html               # Página protegida
│
└── README.md

## 📋 Funcionalidades

- **Cadastro** — validação de senha em tempo real (maiúscula, minúscula, caractere especial, mínimo 8 caracteres)
- **Login** — autenticação com email e senha, geração de token JWT
- **Rotas protegidas** — acesso controlado por middleware, token com expiração
- **Logout** — limpeza do token no localStorage
- **Redirecionamento automático** — usuário autenticado é redirecionado direto para home

## 🛠️ Tecnologias

**Backend**
- Node.js
- Express
- JSON Web Token (JWT)
- bcrypt
- Prisma ORM
- PostgreSQL (Neon)

**Frontend**
- HTML
- CSS
- JavaScript
- Fetch API
- LocalStorage

## 👨‍💻 Autor

Felipe dev — [GitHub](https://github.com/felipedev56) • [LinkedIn](https://linkedin.com/in/felipedev56)