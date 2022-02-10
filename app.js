require('dotenv').config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cadastrodb';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');

const ExpressError = require('./utils/ExpressError');


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);



const Cadastro = require('./models/cadastro');

const cadastros = require('./routes/cadastros');
app.use('/cadastros', cadastros);


mongoose.connect(dbUrl,{ 
   useNewUrlParser: true, 
   useUnifiedTopology: true    
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});


//===============================ROTA PARA PÁGINAS NÃO ENCONTRADAS===============
//Se for chamado uma rota/página inexistente sempre vai cair aqui aula 442
//vai criar um objeto ExpressError lá do arquivo utils/ExpressError.js 
//o next vai passar para a linha abaixo app.use na variável err
app.all('*', (req, res, next) => {
   next(new ExpressError('Página não encontrada', 404));
});
//================================================================================

//=======COMO ÚLTIMO RECURSO SE AINDA DER ALGUM ERRO DAMOS A MENSAGEM QUE ALGO DEU ERRADO====
//aqui tem que ser antes do app.listenen como último recurso mesmo
app.use((err,req, res, next) => {
   //os valores de err vem do app.all
   //os valores de statusCode e message vai ser passada por err de app.all mas na verdade vem lá
   //do ExpressError
   //passa o que tem em err para statusCode se não tiver nada passa 500 valor defoult
   const { statusCode = 500 } = err;
   // se não tiver nada em err.message passa Ho no something went wrong
   if(!err.message) err.message = 'Oh No, Something Went Wrong!';
   //render a pagina error.ejs passando a variavel err que vai conter o erro e o código status
   res.status(statusCode).render('error', { err });   
})
//=======================================================================================


app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})