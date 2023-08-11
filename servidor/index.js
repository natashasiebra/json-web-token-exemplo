// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');
const { json } = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar",] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.post('/logar', (req, res) => {
  let usuario = req.body.usuario
  let senha = req.body.senha

  if(usuario === "natasha@logar" && senha === "2006" ){
   const id = 1;
   const token = jwt.sign({id}, process.env.SECRET, {
    expiresIn:300
   })
   res.cookie('logar', token, {httpOnly: true})
   return res.json({
    usuario: usuario,
    token: token
   })

  }
  res.status(500).json({mensagem: " voê não foi logado"})
})

app.post('/deslogar', function(req, res) {
  res.cookie('logar', null, {httpOnly: true})
  res.json({deslogado:true})
})

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});