

// import { signIn } from "../../../auth";
import { AuthError } from "next-auth";
import { Usuario } from "../models/usuatios";
import { sql } from "@vercel/postgres";

// import { sql } from "@vercel/postgres";

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

// export async function login(dados:any) {
//     console.log("DADOS ===>", dados);
//     try {
//         await signIn('credentials', dados);
//     } catch (err) {
//         if(err instanceof AuthError) {
//             return 'Login Inválido.'
//         }
//         throw err
//     }
// }