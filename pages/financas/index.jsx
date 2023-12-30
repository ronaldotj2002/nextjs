
import { tokenService } from '@/service/tokenService';
import React from 'react';



export default function Financas(props) {

  return (   
 
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5x1 w-full items-center justify-between font-mono text-sm">
        <h1>Minhas finanças</h1>

        <p>
          <a href="/logout">Logout</a>
        </p>

        <pre>
          {JSON.stringify(props, null, 2)}
        </pre>
     
      </div>
   
    </main>
    
    
  )
}


export async function GetServerSideProps(ctx) {

  
  const session = tokenService.get(ctx)
  
  // console.log("<========>", cookies)
  if(session) {   
      return {
        props: {
          session,
        },
      }
    
    } else {

    return {
      redirect: {
        permanent: false,
        destination: '/login',
      }
    }

  }
  

}