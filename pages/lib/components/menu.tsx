import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { tokenService } from '@/service/tokenService';
import Link from 'next/link';

const Menu = () => {

    const router = useRouter();
    const [nome, setNome] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
      // const nomeUsuario = tokenService.getNome(null);
      const ctx = null;
      const nome = tokenService.getNome(ctx)
      const token = tokenService.get()
      if(token) {
          console.log("USUÁRIO LOGADO", token)
      } else {
          console.log("USUÁRIO NÃO LOGADO")
    
      }
      setNome(nome);
      setToken(token);
      console.log("NOME USER", nome)
  }, []);




    
    const handleClick = () => {
        router.push('/login')
      }

      const handleClickCadastro = () => {
        router.push('/cadastro')
      }

      const handleClickLogout = () => {
        router.push('/logout')
      }

    return(
        

<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        {nome ? `Olá ${nome}, Seja Bem-vindo(a)` : 'Olá, Realize o seu login ou cadastre-se'}
        
        {!token ? (
        <button 
            type="button" 
            onClick={handleClickCadastro}
            className=" 
            text-white 
            bg-blue-700 
            hover:bg-blue-800 
            focus:ring-4 
            focus:ring-blue-300 
            font-medium rounded-lg 
            text-sm px-5 
            py-2.5 
            ml-3
            me-2 mb-2 
            dark:bg-blue-600 
            dark:hover:bg-blue-700 
            focus:outline-none 
            dark:focus:ring-blue-800">
                        Cadastro
            </button>
            ) : ('')}
      </span>
  
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  

        {!token ? (

            <button 
            type="button" 
            onClick={handleClick}
            className=" 
            text-white 
            bg-blue-700 
            hover:bg-blue-800 
            focus:ring-4 
            focus:ring-blue-300 
            font-medium rounded-lg 
            text-sm px-5 
            py-2.5 
            me-2 mb-2 
            dark:bg-blue-600 
            dark:hover:bg-blue-700 
            focus:outline-none 
            dark:focus:ring-blue-800">
                        Login
            </button>
                      
                        ) : (

            <button 
                type="button" 
                onClick={handleClickLogout}
                className="
                    text-white 
                    bg-blue-700 
                    hover:bg-blue-800 
                    focus:ring-4 
                    focus:ring-blue-300 
                    font-medium rounded-lg 
                    text-sm px-5 
                    py-2.5 
                    me-2 mb-2 
                    dark:bg-blue-600 
                    dark:hover:bg-blue-700 
                    focus:outline-none 
                    dark:focus:ring-blue-800">
                        Logout
            </button>
            )}
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
      <Link href="/financas">
        <span className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
           Minhas despesas
          </span> 
           </Link>
        {/* <a href="/financas" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page"></a> */}
      </li>
      
      
    </ul>
  </div>
  </div>
</nav>

    )



}

export default Menu;