import { sql } from "@vercel/postgres";
import { z } from 'zod';
import { Despesas } from "../models/despesas";

export async function cadastrarDespesa(dados: Despesas) {

    console.log("DADDESPESA BANCO", dados)

const schema = z.object({
    data:z.string().min((8), 'É preciso informar a data'),
    despesa: z.string().min((5), 'É preciso informar no mínimo 5 caracteres'),
    valor: z.string().min((1), 'É preciso informar um valor'),
    descricao: z.string().min((10), 'É preciso informar no mínimo 10 caracteres'),
    id_usuario: z.string()
  })

  const parse = schema.parse({
    data: dados.data,
    despesa: dados.despesa,
    valor: dados.valor,
    descricao: dados.descricao,
    id_usuario: dados.id_usuario
})

console.log("PARSE BASE", dados)
console.log("schema BASE", schema)

    try {
        const create = await sql<Despesas>`
            INSERT INTO despesas 
            (data, despesa, valor, descricao, id_usuario)
            VALUES (${parse?.data}, ${parse?.despesa},${parse?.valor}, ${parse?.descricao}, ${dados?.id_usuario})
            ON CONFLICT (id) DO NOTHING
            RETURNING id, despesa, valor, descricao
        `;
        // return create.rows[0];
        if(create) {
            console.log("DEU RES NAS DESPESAS", create.rows[0]);
            return `Parabéns, o seu cadastro foi realizado com sucesso! `
        }
        return `Parabéns, o seu cadastro foi realizado com sucesso! `

    } catch (erro) {
        console.error('Erro ao cadastrar usuário:', erro);
        throw new Error('Erro no cadastro de usuário.');
    }
}