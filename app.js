//Constantes de configuração que vem do arquivo dotenv
require('dotenv').config();

//Definição da porta onde vai rodar o app
const port = process.env.PORT || 3000;

//Require do express
const express = require('express');
const app = express();

//Possibilitar acesso ao req.body
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//Const com o path do app
const path = require('path');

//Definição do diretório onde iremos colocar os formulários e views
app.set('views', path.join(__dirname, 'views'));

//Definimos o framework usado ejs
app.set('view engine', 'ejs');

//===============================================================
//Carrega o arquivo /views/cadastro/new.ejs onde está o formulário
app.get('/cadastros/new', (req, res) => {
    res.render('cadastros/new');
});
//O formulário está enviando os dados para a rota /cadastros que é esta aqui
//onde temos acesso aos dados enviados
//para app.post depende necessariamente da linha app.use(express.urlencoded({ extended: true }));
app.post('/cadastros', (req, res) => {
    //depende do urlencoded para visualizar os dados do req.body
    console.log(req.body);
});
//===============================================================

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});