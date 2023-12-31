
import { tokenService } from '@/service/tokenService';
import React from 'react';
import { getUsuarioSession } from './api/despesas';
import { useRouter } from 'next/router';
import Menu from './lib/components/menu';
import Footer from './lib/components/footer';


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
  const router = useRouter();

  const session = Usesession();

  console.log("==>",session)

  const handleClick = () => {
    router.push('/login')
  }

  return (   
    <main classNNameName="flex min-h-screen flex-col items-center justify-between p-24">
<Menu />
<div classNNameName="grid gap-x-8 gap-y-4 grid-cols-1 bg-[url('/images/fnc.jpg')] bg-no-repeat">

  

      
           
        </div>

        
  
        <Footer />
    </main>
    
  )
}