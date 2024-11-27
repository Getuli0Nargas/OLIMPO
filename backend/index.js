const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

  app.use(express.json());

  app.use(cors({
    origin: '*'
  }));

  app.get('/', (req, res) => {
    res.send('Hello, world!');
  });


/*atualizar usuario**/
app.put('/atualizar/usuario/:id', (req, res) => {
  const { nome, email, cpf, senha } = req.body;  
  const { id } = req.params;  

  
  if (!nome || !email || !cpf || !senha) {
      return res.status(400).json({ error: 'Todos os campos (nome, email, cpf, senha) são obrigatórios' });
  }

  
  db.query(
      `UPDATE usuario SET nome = ?, email = ?, cpf = ?, senha = ? WHERE id = ?`,  
      [nome, email, cpf, senha, id],  
      function (err, results) {
          if (err) {
              console.error('Erro na consulta:', err);
              return res.status(500).json({ error: 'Erro ao atualizar o usuário' });
          }

        
          if (results.affectedRows === 0) {
              return res.status(404).json({ error: 'Usuário não encontrado' });
          }

          res.send(`Usuário ${id} atualizado com sucesso!\nNome: ${nome}\nEmail: ${email}\nCPF: ${cpf}\nSenha: ${senha}`);
      }
  );
});



/*deletar usuario**/
  app.delete('/deletar/usuario/:id', (req, res) => {
  const { id } = req.params; 
  db.query(
    `DELETE FROM usuario WHERE id = (?)`,
    [id],
    (err, results) => {
      if (err) {
        console.error('Erro para deletar', err);
        return res.status(500).json({ error: 'Erro para deletar' });
      }
      return res.json(results);
    }
  );
  });


/*cadastrar usuario**/
  app.post('/inserir/usuario', (req, res) => {
    const { nome, email, cpf, senha } = req.body;


    if (!nome || !email || !cpf || !senha) {
      return res.status(400).send('Nome, email, CPF e senha são obrigatórios');
    }

    
    db.query(
      'INSERT INTO usuario (nome, email, cpf, senha) VALUES (?, ?, ?, ?)', 
      [nome, email, cpf, senha], 
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

  app.get('/puxar/usuario/:id', (req, res) => {
    const {id}=req.params;
    db.query(
        `SELECT * FROM usuario WHERE id = ?`,
        [id],
        function(err,results,fields){
            if(err){
                console.error('erro para puxar',err);
                return res.status(500).json({error:'Erro para puxar'})
            }
            return res.json(results)
        }
    )
});




/*----------------FUNCIONARIO---------------------------------**/
/*cadastrar funcionario**/

app.post('/inserir/funcionario', (req, res) => {
  const { nome, email, cpf, senha } = req.body;


  if (!nome || !email || !cpf || !senha) {
    return res.status(400).send('Nome, email, CPF e senha são obrigatórios');
  }

  
  db.query(
    'INSERT INTO funcionario (nome, email, cpf, senha) VALUES (?, ?, ?, ?)', 
    [nome, email, cpf, senha], 
    (err, results, fields) => {
      if (err) {
        console.error('Erro na inserção:', err);
        return res.status(500).send('Erro ao inserir no banco de dados');
      }
      console.log('funcionario inserido:', results);

      res.status(200).send(`funcionario inserido com sucesso!\n\nNome: ${nome}\nEmail: ${email}\nCPF: ${cpf}\nSenha: ${senha}`);
    }
  );
});


/*atualizar funcionario**/

app.put('/atualizar/funcionario/:id', (req, res) => {
  const { nome, email, cpf, senha } = req.body;  
  const { id } = req.params;  

  
  if (!nome || !email || !cpf || !senha) {
      return res.status(400).json({ error: 'Todos os campos (nome, email, cpf, senha) são obrigatórios' });
  }

  
  db.query(
      `UPDATE funcionario SET nome = ?, email = ?, cpf = ?, senha = ? WHERE id = ?`,  
      [nome, email, cpf, senha, id],  
      function (err, results) {
          if (err) {
              console.error('Erro na consulta:', err);
              return res.status(500).json({ error: 'Erro ao atualizar o funcionario' });
          }

        
          if (results.affectedRows === 0) {
              return res.status(404).json({ error: 'Usuário não encontrado' });
          }

          res.send(`funcionario ${id} atualizado com sucesso!\nNome: ${nome}\nEmail: ${email}\nCPF: ${cpf}\nSenha: ${senha}`);
      }
  );
});


/*deletar funcionario**/

app.delete('/deletar/funcionario/:id', (req, res) => {
  const { id } = req.params; 
  db.query(
    `DELETE FROM funcionario WHERE id = (?)`,
    [id],
    (err, results) => {
      if (err) {
        console.error('Erro para deletar', err);
        return res.status(500).json({ error: 'Erro para deletar' });
      }
      return res.json(results);
    }
  );
  });

  /*puxar funcionario**/

  app.get('/puxar/funcionario/:id', (req, res) => {
    const {id}=req.params;
    db.query(
        `SELECT * FROM funcionario WHERE id = ?`,
        [id],
        function(err,results,fields){
            if(err){
                console.error('erro para puxar',err);
                return res.status(500).json({error:'Erro para puxar'})
            }
            return res.json(results)
        }
    )
});

/*----------------------adm-------------------------------*/

/*cadastrar adm**/

app.post('/inserir/adm', (req, res) => {
  const { nome, email, cpf } = req.body; 

  if (!nome || !email || !cpf) {
    return res.status(400).send('Nome, email e CPF são obrigatórios');
  }

  const senha = 'Xperito'; 

  db.query(
    'INSERT INTO adm (nome, email, cpf, senha) VALUES (?, ?, ?, ?)', 
    [nome, email, cpf, senha], 
    (err, results, fields) => {
      if (err) {
        console.error('Erro na inserção:', err);
        return res.status(500).send('Erro ao inserir no banco de dados');
      }
      console.log('Adm inserido:', results);

      res.status(200).send(`Adm inserido com sucesso!\n\nNome: ${nome}\nEmail: ${email}\nCPF: ${cpf}\nSenha: ${senha}`);
    }
  );
});

/*atualizar adm**/

app.put('/atualizar/adm/:id', (req, res) => {
  const { nome, email, cpf, senha } = req.body;  
  const { id } = req.params;  

  
  if (!nome || !email || !cpf || !senha) {
      return res.status(400).json({ error: 'Todos os campos (nome, email, cpf, senha) são obrigatórios' });
  }

  
  db.query(
      `UPDATE adm SET nome = ?, email = ?, cpf = ?, senha = ? WHERE id = ?`,  
      [nome, email, cpf, senha, id],  
      function (err, results) {
          if (err) {
              console.error('Erro na consulta:', err);
              return res.status(500).json({ error: 'Erro ao atualizar o adm' });
          }

        
          if (results.affectedRows === 0) {
              return res.status(404).json({ error: 'adm não encontrado' });
          }

          res.send(`adm ${id} atualizado com sucesso!\nNome: ${nome}\nEmail: ${email}\nCPF: ${cpf}\nSenha: ${senha}`);
      }
  );
});

/*deletar adm**/

app.delete('/deletar/adm/:id', (req, res) => {
  const { id } = req.params; 
  db.query(
    `DELETE FROM adm WHERE id = (?)`,
    [id],
    (err, results) => {
      if (err) {
        console.error('Erro para deletar', err);
        return res.status(500).json({ error: 'Erro para deletar' });
      }
      return res.json(results);
    }
  );
  });


  /*puxar funcionario**/

  app.get('/puxar/adm/:id', (req, res) => {
    const {id}=req.params;
    db.query(
        `SELECT * FROM adm WHERE id = ?`,
        [id],
        function(err,results,fields){
            if(err){
                console.error('erro para puxar',err);
                return res.status(500).json({error:'Erro para puxar'})
            }
            return res.json(results)
        }
    )
});