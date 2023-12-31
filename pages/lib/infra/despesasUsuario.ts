import { sql } from "@vercel/postgres";
import { Despesas } from "../models/despesas";


export async function getDespesas(token: string)  {
    try {
        const usuario = await sql<Despesas> `SELECT * FROM despesas WHERE id_usuario=${token}`;     
        return usuario.rows;
    } catch (err) {
        console.error('Erro na session do usuário DESPESAAAAA', err);
        

    }
}