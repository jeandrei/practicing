//Constantes de configuração que vem do arquivo dotenv
require('dotenv').config();

//Definição da porta onde vai rodar o app
const port = process.env.PORT || 3000;

//Require do express
const express = require('express');
const app = express();

//Possibilitar acesso ao req.body
app.use(express.urlencoded({ extended: true }));

//Mongoose
const mongoose = require('mongoose');

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


const Cadastro = require('./models/cadastro');

const cadastros = require('./routes/cadastros');
app.use('/cadastros', cadastros);


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cadastrodb';

mongoose.connect(dbUrl,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true    
 });
 const db = mongoose.connection;
 db.on("error", console.error.bind(console, "connection error:"));
 db.once("open", () => {
    console.log("Database connected");
 });



app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});