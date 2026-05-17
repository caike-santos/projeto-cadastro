const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());

app.use(express.json());

app.post('/usuarios', (req, res) => {
    const { nome , senha } = req.body;
    if(!nome || !senha){
        return res.status(400).json({mensagem: "Campos obrigatorios vazios"});
    }

    const query = 'INSERT INTO usuarios (nome, senha) VALUES (?, ?)';
    db.query(query, [nome, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco: ' + err.stack);
            return res.status(500).json({ mensagem: 'Erro ao salvar a tarefa.' });
        }
        res.json({id: result.insertId, nome, senha});
    });
});

app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
         if (err) {
            console.error('Erro ao pegar do banco: ' + err.stack);
            return res.status(500).json({ mensagem: 'Erro ao salvar a tarefa.' });
        } 
         res.json(results);
    })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});