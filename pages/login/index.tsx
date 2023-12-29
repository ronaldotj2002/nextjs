import React from 'react';
import LoginForm from '../lib/ui/login';


export default function Login() {

  return (   
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5x1 w-full items-center justify-between font-mono text-sm">
        <LoginForm />
     
      </div>
   
    </main>
    
  )
}