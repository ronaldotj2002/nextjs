
import React from 'react';
import Cadastro from '../lib/ui/cadastro-usuario';
import Menu from '../lib/components/menu';
import Footer from '../lib/components/footer';


export default function Restrito() {

  return (   
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Menu />
      <div className="z-10 max-w-5x1 w-full items-center justify-between font-mono text-sm">
        <Cadastro />
     
      </div>
      <Footer />
    </main>
    
  )
}