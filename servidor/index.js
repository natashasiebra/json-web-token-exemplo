// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

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
  }).unless({ path: ["/autenticar", "/logar", "/deslogar", "/"] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.post('/logar', (req, res) => {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  let usuario = req.body.usuario
  let senha = req.body.senha

  if(usuario === "natasha@logar" && senha === "2006" ){
    res.send('vc foi logado')
  }else{
    res.send('erro ao tentar logar')
  }
=======
>>>>>>> Stashed changes
  res.send('você esta logado')
  
>>>>>>> ddee0f1ffb4bfe1b4687089a5bbdf1244b03f3b9
})

app.post('/deslogar', function(req, res) {
  
})

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});