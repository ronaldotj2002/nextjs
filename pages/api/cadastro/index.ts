import { cadastrarUsuario } from "@/pages/lib/infra/cadUsuario";


console.log("POST - body")


export default async function POST(req:any, res:any) {

    let cadastro = await req.body;
    console.log("POST - body", cadastro)
    try {
      cadastro = await  cadastrarUsuario(cadastro);
           
        return res.status(200).json({mensagem: 'Cadastro Realizado com Sucesso!'})
      
    }catch(error) {

      const listaErros = {nome: '', email: '', senha: ''};
      const erros = error.issues.map((erro:any) => {
        if(erro.path[0] === 'nome') listaErros.nome = erro.message;
        if(erro.path[0] === 'email') listaErros.email = erro.message;
        if(erro.path[0] === 'senha') listaErros.senha = erro.message;
      })
      
      return res.json({ listaErros });
    }  
  }