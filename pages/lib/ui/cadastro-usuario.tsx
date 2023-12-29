
import Link from 'next/link';
import { useState } from 'react';
export default function Cadastro() {

        // const [usuarios, setUsuarios] = useState<Usuario[]>([]);
        const [usuario, setUsuario] = useState({ email: '', nome: '', senha: '' });
        const [mensagem, setMensagem] = useState('');
        const [mensagemNome, setMensagemNome] = useState('');
        const [mensagemEmail, setMensagemEmail] = useState('');
        const [mensagemSenha, setMensagemSenha] = useState('');

    

    const handleChange = (event: React.FormEvent<EventTarget>) => {
        const target = event.target as HTMLInputElement;
        const fieldName = target.name;
        const fieldValue = target.value;

        if(fieldName === 'email') {
            setMensagemEmail('');
        }

        if(fieldName === 'senha') {
            setMensagemSenha('');
        }

        if(fieldName === 'nome') {
            setMensagemNome('');
        }
    
        setUsuario((prevUsuario) => {
          return { ...prevUsuario, [fieldName]: fieldValue };
        });
        setMensagem('');
      };
      
      const handleSave = async (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });
            
            const data = await response.json();

            setMensagem(data.mensagem);
           
            if(data.error?.issues[0].path[0] === 'nome') 
                setMensagemNome('O nome precisa ter pelo menos 6 caracteres');
            

            if(data.error?.issues[0].path[0] === 'email') 
                setMensagemEmail('O e-mail precisa ter pelo menos 7 caracteres');
            

            if(data.error?.issues[0].path[0] === 'senha') 
                setMensagemSenha('A senha precisa ter pelo menos 5 caracteres');
          
              
            
          
          
    
          setUsuario({ email: '', nome: '', senha: '' });
          
        } catch (error) {
          console.error(error ?? '');
        }
      };


  return (
    <main className="flex px-6 drop-shadow-2xl lg:w-3/4 bg-white">
      <section className="bg-azul-escuro hidden lg:block w-1/2 rounded-l-lg bg-[url('/images/img-cadastro.jpg')] bg-no-repeat">
        
      </section>

      <section className="bg-white p-10 gap-6 flex flex-col rounded-lg lg:w-1/2 justify-center lg:rounded-l-none">
        <div className="hidden">
    
        </div>
        <div className="text-center">
          <h1 className="text-4xl mb-2">Cadastro</h1>
          <p className="text-xl text-gray-700 mb-2">Realize o seu cadastro!</p>
        </div>
        <form className="space-y-6" onSubmit={handleSave}>
        {/* <input name='id' value={usuario.id} onChange={handleChange} className="invisible" /> */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">E-mail</label>
            <div className="mt-2">
              <input required id="email" name="email" type="email" value={usuario.email} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
              <small>{mensagemEmail ?? ''}</small>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Nome</label>
            <div className="mt-2">
              <input required id="nome" name="nome" type="nome" value={usuario.nome} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                <small>{mensagemNome ?? ''}</small>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">Senha</label>
            </div>

            <div className="mt-2">
              <input required id="senha" name="senha" type="password" value={usuario.senha} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
              <small>{mensagemSenha ?? ''}</small>
            </div>
          </div>

          <div>
          <button type="submit" onClick={handleSave} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cadastrar</button>
       
          </div>
          <div className="flex h-5 items-end space-x-1">
                    
                            <p className="text-sm">{mensagem ?? ''}</p>
                     

                    </div>
        </form>
         

        <p className="mt-10 text-center text-sm text-gray-500">
          Já possui conta?
          <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Logar</Link>
        </p>

      </section>
    <pre></pre>
    </main>
  )

  
}


