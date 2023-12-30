
import { tokenService } from '@/service/tokenService';
import React from 'react';
import { getUsuarioSession } from './api/session';

function Usesession() {
  const [session, setSession] = React.useState(Object);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchToken = async () => {
      
      try {
        const token = tokenService.get()
        if(token) {

          const resposta = getUsuarioSession(token)
          console.log("resp", token)
          setSession(resposta)
        } else {
          return {
            redirect: {
              permanent: false,
              destination: '/login',
            }
          }
        }
      } catch(error) {
        
      }
    }
 
    fetchToken();

  }, []);


  return {
    data: session,
    error,
    loading,
  }
}

export default function Home(props) {

  const session = Usesession();

  console.log("==>",session)

  return (   
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5x1 w-full items-center justify-between font-mono text-sm">
        <h1>Projeto de Bloco - Alterado</h1>
        <pre>
          {JSON.stringify(props, null, 2)}
        </pre>
      </div>
      <p>
          <a href="/login">Login</a>
        </p>
   
    </main>
    
  )
}