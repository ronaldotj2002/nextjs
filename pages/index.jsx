
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
<div classNNameName="grid gap-x-8 gap-y-4 grid-cols-1">

  

<section classNName="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
    <div classNName="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 classNName="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">We invest in the world’s potential</h1>
        <p classNName="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        <div classNName="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#" classNName="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
                <svg classNName="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
            <a href="#" classNName="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                Learn more
            </a>  
        </div>
    </div>
</section>

      
           
        </div>

        
  
        <Footer />
    </main>
    
  )
}