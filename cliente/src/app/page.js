'use client'
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import styles from "../globals.css";
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const [user, setUser] = useState({
    nome: '',
    password: '',
  });
  const { push, refresh} = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await handlerAcessUser(user);
      if(userAuth.token === undefined){
        toast.error("Erro no nome ou senha!")
      }
      push('/pages/dashboard');
    } catch {
      refresh();
    }
  }
  return (
    <body>
    <div class="body">
      <form onSubmit={handlerLogin}>
      <div class="avatar">
      </div>
      <h1>Entrar</h1>
        <input
          placeholder='name'
          type="name"
          onChange={(e) => { setUser({ ...user, nome: e.target.value }) }}>
        </input>
        <input
          placeholder='Senha'
          type='password'
          onChange={(e) => { setUser({ ...user, password: e.target.value }) }}>
        </input>
        <button class="button-64"  ><span class="text">Entrar</span></button>
      </form>
      <ToastContainer/>
    </div>
    </body>
  );
}



 