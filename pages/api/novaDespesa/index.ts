import { cadastrarDespesa } from "@/pages/lib/infra/cadDespesa";

console.log("DESPESA...")

export default async function POST(req:any, res:any) {

    let cadastro = await req.body;
    // console.log("DADOS NOVA DESPESA", cadastro)
    try {
      cadastro = await  cadastrarDespesa(cadastro);
    console.log("DADOS NOVA DESPESA", cadastro)
           
        return res.status(200).json({mensagem: 'Cadastro Realizado com Sucesso!'})
      
    }catch(error) {
        const listaErro = {data: '', despesa: '', valor: '', descricao: ''};
      const erros = error.issues.map((erro:any) => {
        if(erro.path[0] === "data") listaErro.data = erro.message;
        if(erro.path[0] === "despesa") listaErro.despesa = erro.message;
        if(erro.path[0] === "valor") listaErro.valor = erro.message;
        if(erro.path[0] === "descricao") listaErro.descricao = erro.message;
      })
      return res.status(401).json({ listaErro });
    }  
  }