const mongoose = require('mongoose');

const Cadastro = require('./models/cadastro');

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


const seedCadastro = [  
    {
        cadastroNome: 'Usuario 22',
        cadastroCpf: '11111101',  
        cadastroEmail: 'usuario01',
        cadastroCelular: '111f111101'        
    }
];

//IMPORTANTE se algo não passar na validação nada será inserido
Cadastro.insertMany(seedCadastro)
.then(res => {
    console.log(res);
})
.catch(e => {
    console.log(e);
});