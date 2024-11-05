const express = require('express');
const db = require('./db');
const cors = require('cors')
const app = express();
app.use(express.json());
const port = 3000;

app.use(cors({
  origin: '*'
}))


// Definir uma rota simples
app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  
  // Configurar o servidor para rodar na porta 3000
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });


app.post('/inserir/cliente', (req, res) => {
    const { nome, email, cpf} = req.body;
   
    db.query(
        `INSERT INTO cliente (nome, email, cpf) VALUES (?, ?, ?)`,
        [nome, email, cpf],
        function (err, results, fields) {
          if (err) {
            console.error('Erro na inserção:', err);
            return;
          }
          console.log(results);
          console.log(fields);
        }
      );
    res.send(`cliente inserido!\n\nnome: ${nome} \nemail: ${email} \ncpf: ${cpf}`);
});

app.listen(port, () => {
    console.log("rodsando")
})