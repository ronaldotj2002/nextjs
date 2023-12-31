
import { getDespesas } from "@/pages/lib/infra/despesasUsuario";

export async function listarDespesas(req:any, res:any) {

    const token = req    
    try {
        const usuario = await getDespesas(token);
        if(usuario)
        return usuario;
       
    } catch (err) {
        console.error('Erro na session do usuário ---> req despesas', err);        

    }
}
