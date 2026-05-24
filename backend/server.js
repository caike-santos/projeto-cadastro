const express = require('express');
const cors = require('cors');
const db = require('./db');
const validator = require('validator');

const app = express();

app.use(cors());

app.use(express.json());

app.post('/usuarios', (req, res) => {
    const { email, nome , senha } = req.body;
    if(!email || !validator.isEmail(email)){
        return res.status(400).json({ mensagem: "O e-mail fornecido é inválido!" });
    }

    if(!nome || !senha){
        return res.status(400).json({mensagem: "Campos obrigatorios vazios"});
    }

    const query = 'INSERT INTO usuarios (email, nome, senha) VALUES (?, ?, ?)';
    db.query(query, [email, nome, senha], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensagem: "Este e-mail já está cadastrado!" });
        }
            console.error('Erro ao inserir no banco: ' + err.stack);
            return res.status(500).json({ mensagem: 'Erro ao salvar o usuario.' });
        }
        res.json({email, nome, senha});
    });
});

app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
         if (err) {
            console.error('Erro ao pegar do banco: ' + err.stack);
            return res.status(500).json({ mensagem: 'Erro ao buscar o usuario.' });
        } 
         res.json(results);
    })
})

app.delete('/usuarios/:email', (req, res) => {
    const { email } = req.params;
    const query =  'DELETE FROM usuarios WHERE email = ?';

    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Erro ao deletar do banco: ' + err.stack);
            return res.status(500).json({ mensagem: 'Erro ao deletar o usuario.' });
        } 
        res.json({ message: 'Tarefa deletada com sucesso!' });
    })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});