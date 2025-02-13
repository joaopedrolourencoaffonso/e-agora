require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

// Variáveis de ambiente
const address = process.env.address;
const MyToken = process.env.MyToken;
const MercadoSimples = process.env.MercadoSimples;
const blockchainPort = process.env.BLOCKCHAIN_PORT
const server_port = process.env.SERVER_PORT;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// política de segurança
app.use(function(req, res, next) {
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' http://localhost:3000;");
  next();
});
  

// Basic route
app.get('/', (req, res) => {
    try {
        res.render('index',{MyToken, MercadoSimples});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving message from smart contract');
    }
});

// Start server
app.listen(server_port, () => {
  console.log(`Server running at http://localhost:${server_port}`);
});