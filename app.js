require('dotenv').config();

console.log('Configuração do arquivo .env');

const secreto = process.env.SECRETO;

console.log (`O valor passado pelo dotenv é ${secreto}`);