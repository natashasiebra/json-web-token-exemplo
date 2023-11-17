const crypto = require('./crypto');

const encrypted_key = crypto.encrypt("HelloWorld");
console.log(encrypted_key);
const decrypted_key = crypto.decrypt(encrypted_key);
console.log(decrypted_key);
// JWT
require("dotenv-safe").config(); // Carrega variáveis de ambiente do arquivo .env
const jwt = require('jsonwebtoken'); // Importa a biblioteca 'jsonwebtoken' para trabalhar com tokens JWT
var { expressjwt: expressJWT } = require("express-jwt"); // Importa o middleware 'express-jwt' para autenticação com JWT
const cors = require('cors'); // Importa a biblioteca 'cors' para lidar com Cross-Origin Resource Sharing (CORS)
const corsOptions = {
  //aonde o cliente pode acesar.
    origin: "http://localhost:3000",
   //metodos que o cliente pode fazer.
    methods: "GET, PUT, POST, DELETE",
    allowedHeaders : "Content-Type, Authorization",
    creadentials: true,
}
app.use(cors(corsOptions))

var cookieParser = require('cookie-parser'); // Importa a biblioteca 'cookie-parser' para análise de cookies

const express = require('express'); // Importa o framework Express.js
const { usuario } = require('./models'); // Importa o modelo 'usuario' (possivelmente um modelo de banco de dados)

const app = express(); // Cria uma instância do aplicativo Express

app.set('view engine', 'ejs'); // Configura o mecanismo de visualização como EJS

app.use(cors()); // Habilita o CORS para permitir solicitações de origens diferentes

app.use(express.json()); // Middleware para analisar solicitações JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analisar dados de formulário codificados
app.use(express.static('public')); // Middleware para servir arquivos estáticos da pasta 'public'

app.use(cookieParser()); // Middleware para analisar cookies
app.use(
  expressJWT({
    secret: process.env.SECRET, // Configura a chave secreta para verificar tokens JWT
    algorithms: ["HS256"], // Configura o algoritmo de assinatura JWT
    getToken: req => req.cookies.token // Define como obter o token JWT do cookie 'token'
  }).unless({ path: ["/autenticar", "/logar", "/deslogar", ] })
  // Define exceções para autenticação JWT, ou seja, caminhos que não exigem token JWT
);

app.get('/usuario/cadastrar', async function(req, res){
  res.render('cadastrar'); // Renderiza a página 'cadastrar'
})

app.get('/usuario/listar', async function(req,res){
  try{
  var servidor = await usuario.findAll(); // Recupera todos os usuários do banco de dados
  res.json(servidor); // Renderiza a página 'listar' com a lista de usuários

}catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Ocorreu um erro ao buscar os usuário.' });
}
});

app.get('/autenticar', async function(req, res){
  res.render('autenticar'); // Renderiza a página 'autenticar'
})

app.get('/', async function(req, res){
  res.render("home"); // Renderiza a página 'home'
})

app.post('/logar', async (req, res) => {
  const u = await usuario.findOne({ where: { nome: req.body.nome, senha:crypto.encrypt( req.body.senha) } });

  if(u){
   const id = 1;
   const token = jwt.sign({id}, process.env.SECRET, {
    expiresIn:300 // Gera um token JWT com uma duração de 300 segundos (5 minutos)
   });
   res.cookie('token', token, {httpOnly: true}).json({
    nome: u.nome,
    token: token,
   }); // Define um cookie 'logar' com o token JWT
  // return res.json({
   // usuario: req.body.usuario,
    //token: token // Retorna o token JWT e informações do usuário em uma resposta JSON
  // });
  }
  res.status(500).json({mensagem: "você não foi logado"}); // Retorna um erro se a autenticação falhar
})

app.post('/deslogar', function(req, res) {
  res.cookie('token', null, {httpOnly: true}); // Remove o cookie 'logar' para deslogar o usuário
  res.json({deslogado:true}); // Retorna uma resposta JSON indicando que o usuário foi deslogado
})

  

app.post('/usuario/cadastrar', async function(req, res){
 if(req.body.senha == req.body.confirme){
  try { 
    const crypt = {
      nome: req.body.nome,
      senha: crypto.encrypt(req.body.senha)
    }
    if(req.body.senha == req.body.confirme){
      const servidor = await usuario.create(crypt);
      res.redirect('/usuario/listar')
    }
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'A senha esta errada' });
}}})

app.get('/', async function(req,res){
  try{
    var usuarios = await usuario.findAll(); // Recupera todos os usuários do banco de dados
    req.render('home', {usuarios}); // Renderiza a página 'home' com a lista de usuários

  }catch(err){
    console.log(err);
    res.status(500).json({mensagem: 'ocorreu um erro ao buscar os usuarios'}); // Retorna um erro se a busca de usuários falhar
  }
})

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!'); // Inicia o servidor na porta 3000
})