//Constantes de configuração que vem do arquivo dotenv
require('dotenv').config();

//Definição da porta onde vai rodar o app
const port = process.env.PORT || 3000;

//Require do express
const express = require('express');
const app = express();

//Possibilitar acesso ao req.body
app.use(express.urlencoded({ extended: true }));

//Method override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static('public'));

//Const com o path do app
const path = require('path');

//Definição do diretório onde iremos colocar os formulários e views
app.set('views', path.join(__dirname, 'views'));

//Definimos o framework usado ejs
app.set('view engine', 'ejs');



app.get('/cadastros/new', (req, res) => {
    res.render('cadastros/new');
});

app.post('/cadastros', (req, res) => { 
    console.log(req.body);
});


app.get('/cadastros/delete', (req, res) => {
    res.render('cadastros/delete');
});

app.delete('/cadastros', (req, res) => {
    res.send('Você clicou em delete');
});


app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});