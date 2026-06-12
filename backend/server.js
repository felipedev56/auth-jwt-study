const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// ================= MIDDLEWARES =================
app.use(cors());
app.use(express.json());

// ================= CONFIG =================
const SECRET = 'chave-super-secreta';

// ================= ROTAS =================

app.get('/', (req, res) => {
  res.send('API de login rodando 🚀');
});

// rota de cadastro
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  // validação da senha
  const senhaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(password);
  if (!senhaValida) {
    return res.status(400).json({
      message: 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um caractere especial'
    });
  }

  // verifica se email já existe
  const usuarioExistente = await prisma.user.findUnique({ where: { email } });
  if (usuarioExistente) {
    return res.status(409).json({ message: 'Email já cadastrado' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, passwordHash }
  });

  return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

// rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Email ou senha inválidos' });
  }

  const senhaCorreta = await bcrypt.compare(password, user.passwordHash);
  if (!senhaCorreta) {
    return res.status(401).json({ message: 'Email ou senha inválidos' });
  }

  const token = jwt.sign(
    { email: user.email },
    SECRET,
    { expiresIn: '30s' }
  );

  return res.status(200).json({ message: 'Login autorizado', token });
});

// ================= MIDDLEWARE DE AUTENTICAÇÃO =================
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não enviado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}

// ================= ROTA PROTEGIDA =================
app.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Acesso permitido', user: req.user });
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});