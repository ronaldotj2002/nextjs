
import { tokenService } from '@/service/tokenService';
import React from 'react';
import { useState } from 'react';
import { listarDespesas } from './../api/despesas'
import { useRouter } from 'next/router';
import Menu from '../lib/components/menu';
import Footer from '../lib/components/footer';



export default function Financas(props: any) {
  console.log("PROPS", props);
  const router = useRouter();

  const [despesa, setDespesa] = useState({ data: '', despesa: '', valor: '', descricao: '', id_usuario: '',});
  const [mensagem, setMensagem] = useState('');
  const [mensagemData, setMensagemData] = useState('');
  const [mensagemDespesa, setMensagemDespesa] = useState('');
  const [mensagemValor, setMensagemValor] = useState('');
  const [mensagemDescricao, setMensagemDescricao] = useState('');
  
  const handleChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    const fieldName = target.name;
    const fieldValue = target.value;

    if (fieldName !== 'id_usuario') { 
    setDespesa((prevDespesa) => {
      return { ...prevDespesa, [fieldName]: fieldValue };
    });
    setMensagem('');
  }
  };

  const ctx = null
  const session = tokenService.get(ctx)
  const id = session

  const handleSave = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    try {
        despesa.id_usuario = id;
        const response = await fetch('/api/novaDespesa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(despesa),
        });
        
        const data = await response.json();

        setMensagem(data.mensagem);

        if (response.ok) {

          console.log("NOVA DESPESA FRONT");
          // Se o cadastro foi bem-sucedido, busque novamente as despesas do usuário          
          window.location.reload();
        }
       
        if(data.listaErro.data) 
          setMensagemData(data.listaErro.data)

        if(data.listaErro.despesa) 
          setMensagemDespesa(data.listaErro.despesa)

        if(data.listaErro.valor) 
          setMensagemValor(data.listaErro.valor)

        if(data.listaErro.descricao) 
          setMensagemDescricao(data.listaErro.descricao)
            
        
      setDespesa({ data: '', despesa: '', valor: '', descricao: '', id_usuario: ''});
      
    } catch (error) {
      console.error(error ?? '');
    }
  };

  

  return (
    <main className="grid grid-cols-3 gap-4 bg-white">
      <Menu />
      <section className="bg-white p-10 gap-6 flex flex-col rounded-lg justify-center lg:rounded-l-none">
        <div className="text-center">
          <h1 className="text-4xl mb-2">Minhas Despesas</h1>
          <p className="text-xl text-gray-700 mb-2">cadastre a sua despesa</p>
        </div>
        <form className="space-y-6" onSubmit={handleSave}>
          <input name='id_usuario' value={despesa.id_usuario} onChange={handleChange} className="invisible" />
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Informe a data:
            </label>
            <div className="mt-2">
              <input
                required
                id="data"
                name="data"
                type="date"
                value={despesa.data} onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
              <small className="text-red-700">{mensagemData ?? ''}</small>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Informe a despesa:
            </label>
            <div className="mt-2">
              <input
                required
                id="despesa"
                name="despesa"
                type="text"
                value={despesa.despesa} onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
              <small className="text-red-700">{mensagemDespesa ?? ''}</small>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Valor da Despesa:{" "}
            </label>
            <div className="mt-2">
              <input
                required
                id="valor"
                name="valor"
                type="text"
                value={despesa.valor} onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
              <small className="text-red-700">{mensagemValor ?? ''}</small>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Descrição da despesa
            </label>
            <div className="mt-2">
              <textarea
                id="descricao"
                name="descricao"
                rows={4}
                value={despesa.descricao} onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
              <small className="text-red-700">{mensagemDescricao ?? ''}</small>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSave}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cadastrar
            </button>
          </div>
          <div className="flex h-5 items-end space-x-1">
            <p className="text-sm">{mensagem ?? ''}</p>
          </div>
        </form>
      </section>

      <section className="bg-white p-10 col-span-2 gap-6 flex flex-col rounded-lg justify-center lg:rounded-l-none">
        <div className="text-center">
          <h1 className="text-4xl mb-2">Minhas finanças</h1>
          <p className="text-xl text-gray-700 mb-2">cadastre a sua despesa</p>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Data da Despesa
                </th>
                <th scope="col" className="px-6 py-3">
                  Despesa
                </th>
                <th scope="col" className="px-6 py-3">
                  Valor
                </th>
                <th scope="col" className="px-6 py-3">
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody>
              {props.despesasUsuario.dadosusuario.map((item: any) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.data}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.despesa}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.valor}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.descricao}
                  </th>
                </tr>
              ))}

            </tbody>
          </table>
    
        </div>
      </section>

        <Footer />
    </main>
  );
}


export async function getServerSideProps(ctx) {

    
  const session = tokenService.get(ctx)
  const nome = tokenService.getNome(ctx)

  // const token = JSON.stringify(session)
  const dadosusuario = await listarDespesas(session, '')
  const despesasUsuario = JSON.parse(JSON.stringify({dadosusuario}))

  console.log("meus dados", despesasUsuario);

  

  
  console.log("token de consulta: ", session )
  
  // console.log("<========>", cookies)
  if(session) {   
     console.log("<===DADOS USUARIO DESPESAS====dd>")
      return {
        props: {
          despesasUsuario
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