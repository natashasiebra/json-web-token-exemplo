'use client'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { useState } from "react";
import { postUser } from "@/app/functions/handlerAcessAPI";
import { useRouter } from 'next/navigation';

export default function Register(){
  const [user, setUser] =useState({
    name:'',
    email: '',
    password: ''
  });

  const {push} = useRouter();

  const handlerFormSubmit = async (event) => {
    event.preventDefault();

    try{
      await postUser(user);
      return push("/pages/dashboard");
    } catch{
      return toast.error("Erro");
    }
  }


    return (
      <div>
        <h1>Cadastrar</h1>
        <form onSubmit={handlerFormSubmit}>
        <input
          placeholder='Nome'
          type="name"
          onChange={(e) => { setUser({ ...user, name: e.target.value }) }}>
        </input>
        <input
          placeholder='E-mail'
          type="email"
          onChange={(e) => { setUser({ ...user, email: e.target.value }) }}>
        </input>
        <input
          placeholder='Senha'
          type='password'
          onChange={(e) => { setUser({ ...user, password: e.target.value }) }}>
        </input>
          <button>Cadastrar</button>
          <ToastContainer/>
        </form>
      </div>
    )
  }

