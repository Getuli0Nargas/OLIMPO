const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/inserir/usuario', (req, res) => {
  const { nome, email, cpf, senha } = req.body;


  if (!nome || !email || !cpf || !senha) {
    return res.status(400).send('Nome, email, CPF e senha são obrigatórios');
  }

  
  db.query(
    'INSERT INTO usuario (nome, email, cpf, senha) VALUES (?, ?, ?, ?)', 
    (err, results, fields) => {
      if (err) {
        console.error('Erro na inserção:', err);
        return res.status(500).send('Erro ao inserir no banco de dados');
      }
      console.log('Usuário inserido:', results);

      res.status(200).send(`Usuário inserido com sucesso!\n\nNome: ${nome}\nEmail: ${email}\nCPF: ${cpf}\nSenha: ${senha}`);
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

