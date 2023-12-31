import { sql } from "@vercel/postgres";
import { Despesas } from "../models/despesas";


export async function getDespesas(token: string): Promise<Despesas | undefined>  {
    console.log('TOKENNNN DESPESA', token);
    try {
        const usuario = await sql<Despesas> `SELECT * FROM despesas WHERE id_usuario=${token}`;
        // if(usuario) {
        //     console.log("RETORNOU DA BASE", usuario.rows[0]) 
        // } else {
        //     console.log("DEU RUIM NA BASE..")
        // }
        console.log("USUÁRIO DESPESA", usuario.rows)
        return usuario.rows;
    } catch (err) {
        console.error('Erro na session do usuário DESPESAAAAA', err);
        

    }
}