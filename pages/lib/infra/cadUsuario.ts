import { sql } from "@vercel/postgres";
import { Usuario } from "../models/usuatios";
import bcrypt from 'bcrypt';
import { z } from 'zod';
import crypto from 'crypto';


export async function cadastrarUsuario(usuario: Usuario) {

const schema = z.object({
    email: z.string().min(7),
    nome: z.string().min(6),
    senha: z.string().min(5),
  })

  const parse = schema.parse({
    email: usuario.email,
    nome: usuario.nome,
    senha: usuario.senha,
})


    let hashSenha = await bcrypt.hash(`${parse.senha}`, 10);
    let token = crypto.randomBytes(24).toString('hex');

    try {
        const create = await sql<Usuario>`
            INSERT INTO usuarios 
            (nome, email, senha, token)
            VALUES (${parse?.nome}, ${parse?.email},${hashSenha}, ${token})
            ON CONFLICT (id) DO NOTHING
            RETURNING id, email, nome, token
        `;
        // return create.rows[0];
        if(create) {
            console.log("DEU RES", create.rows[0]);
            return `Parabéns, o seu cadastro foi realizado com sucesso! `
        }
        return `Parabéns, o seu cadastro foi realizado com sucesso! `

    } catch (erro) {
        console.error('Erro ao cadastrar usuário:', erro);
        throw new Error('Erro no cadastro de usuário.');
    }
}