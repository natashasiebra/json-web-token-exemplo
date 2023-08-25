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
  }).unless({ path: ["/autenticar", "/logar", "/deslogar", "/usuario/cadastrar", "/usuario/listar"] })
);

app.get('/usuario/cadastrar', async function(req, res){
  res.render('cadastrar');
})

app.get('/usuario/listar', async function(req, res){
  res.render('listar');
})

app.post('/usuario/cadastrar', async function(req, res){

if (req.body.password === req.body.confirmeS)
      res.json({mensagem:"conseguiu"})
    else(
      res.json({mensagem:"vc não conseguiu"})
    )} ) 
    
app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})
  
app.post('/logar', (req, res) => {
  let usuario = req.body.usuario
  let senha = req.body.senha

  if(usuario == "natasha@logar.com" && senha == "2006" ){
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
  res.status(500).json({mensagem: " você não foi logado"})
})

app.post('/deslogar', function(req, res) {
  res.cookie('logar', null, {httpOnly: true})
  res.json({deslogado:true})
})
app.post('/usuario/cadastrar', async function(req, res){
 if(req.body.senha == req.body.confirme){
  await usuario.create(req.body)
  res.redirect('/usuario/listar')
  req.json("cadastro feito com sucesso")
 }else{
  res.status(500).json("senha incorreta") 
}})

app.get('/', async function(req,res){
  try{
    var usuarios = await usuario.findAll();
    req.render('home', {usuarios});

  }catch(err){
    console.log(err);
    res.status(500).json({mensagem: 'ocorreu um erro ao buscar os usuarios'})
  }
})

app.get('/usuario/listar', async function(req,res){
  try{
    var usuarios = await usuario.findAll();
    req.render('listar', {usuarios});

  }catch(err){
    console.log(err);
    res.status(500).json({mensagem: 'ocorreu um erro ao buscar os usuarios'})
  }
})



app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});

