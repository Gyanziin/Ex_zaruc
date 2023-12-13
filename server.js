const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = {
  usuarios: [
    {
      id: 1,
      name: 'Gyanziin',
      email: 'gyanhugo1@gmail.com',
      password: '$2b$10$sgAuefj3/hFIoBFXSfB5vObnPb7pGYoqrFEto2.lco1F2rPwrhwYi', // bcrypt hash for 'Gyanziin.1'
    },
    {
      id: 2,
      name: 'adryel',
      email: 'mauricio@gmail.com',
      password: '$2b$10$N9TLn/58KHvcwxFRbhD1ZO6Np0EKLqO9JwZ3jqmnk5t4i1Gl/OXAC', // bcrypt hash for 'anedina.1'
    },
  ],
};

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.usuarios.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Comparar senha fornecida com a senha armazenada usando bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Se as credenciais estiverem corretas, gerar um token JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, 'seuSegredoJWT', { expiresIn: '1h' });

  res.json({ token });
});

app.listen(port, () => {
  console.log(`JSON Server está rodando em http://localhost:${port}`);
});
