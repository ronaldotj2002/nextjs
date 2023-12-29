
import { Usuario } from "@/pages/lib/models/usuatios";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";



console.log("POST - body")

export async function getUsuarioPorEmail(email: string): Promise<Usuario | undefined> {
    
    try {
        const usuario = await sql<Usuario> `SELECT * FROM usuarios WHERE email=${email}`;
        // console.log("USUÁRIO", usuario)
        return usuario.rows[0];
    } catch (err) {
        console.error('Erro na consulta de usuário', err);
        throw new Error('Erro na consulta de usuário')

    }
}


export default async function POST(req:any, res:any) {

    // const { email, senha } = req.body;

    const email = await req.body.email.email;
    const senha = await req.body.email.senha;
    try {

            const usuario = await getUsuarioPorEmail(email);
            // console.log("USUÁRIO", usuario)
            if(!usuario) 
                return res.status(401).json({ error: 'Usuário não encontrado.' });
            
                const senhaOk = await bcrypt.compare(senha, usuario.senha);
                console.log("senhaOk", senhaOk)
                
                if(!senhaOk){
                    console.log("USER", usuario)
                    return res.status(401).json({ error: 'Senha incorreta.' });
                } 
                
                return res.status(200).json({ nome: usuario.nome, email: usuario.email, token: usuario.token });                      
      
      
    }catch(error) {
        console.error('Erro ao realizar o login:', error);
        return res.status(500).json({ error: 'Erro ao realizar o login.' });
    }  
  }