
import { Usuario } from "@/pages/lib/models/usuarios";
import { sql } from "@vercel/postgres";



console.log("SESSION API - body")

export async function getUsuarioSession(token: any) {
    console.log('TOKENNNN', token)
    try {
        const usuario = await sql<Usuario> `SELECT * FROM usuarios WHERE token=${token}`;
        console.log("USUÁRIO", usuario)
        return usuario.rows[0];
    } catch (err) {
        console.error('Erro na session do usuário', err);
        

    }
}
