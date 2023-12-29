import { cadastrarUsuario } from "@/pages/lib/infra/cadUsuario";


console.log("POST - body")


export default async function POST(req:any, res:any) {

    let cadastro = await req.body;
    console.log("POST - body", cadastro)
    try {
      cadastro = await  cadastrarUsuario(cadastro);
           
        return res.status(200).json({mensagem: 'Cadastro Realizado com Sucesso!'})
      
    }catch(error) {
      
      return res.json({ error });
    }  
  }