import { Usuario } from "../models/usuarios";
import { sql } from "@vercel/postgres";

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
