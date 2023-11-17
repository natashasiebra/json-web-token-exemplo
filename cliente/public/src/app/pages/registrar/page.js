
'use client'
import "./style.css"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UserForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
     toast.success('Vingador registrado com sucesso ')
    // Verifique se onSubmit é uma função antes de chamá-la
    
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div class="avatar"> </div>
      <h1>Registrar</h1>
      <div className="input">
      <input 
          placeholder='Nome'
          type="Nome"
         ></input>
        <input
          placeholder='E-mail'
          type="email"
         >
        </input>
        <input
          placeholder='Senha'
          type='password'
          >
        </input>
        </div>
        <button class="button-64"  ><span class="text">Salvar</span></button>
        <button class="button-65"><span class="text"><a href="/pages/dashboard">Voltar</a></span></button>
     
      </form>
      <ToastContainer/>
    </div>
  );
};

export default UserForm;

