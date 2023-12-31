import { HttpClient } from './pages/lib/infra/HttpClient/HttpClient';
import { tokenService } from './service/tokenService';
import { getUsuarioSession } from './pages/api/despesas/index'

export const authService = {
    async login(email, senha) {
       return HttpClient('/api/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, 
                senha,
            })
        })
        .then(async (resposta) => {
           
            if(!resposta.ok) throw new Error('Usuário ou senha inválidos!')
            const body = await resposta.body;
            tokenService.save(body.nome, body.token)
        })
        .catch((err) => {
            console.error("Erro ao fazer login", err);
            throw err;
        })
    },

    async getSession(ctx) {

        const token = tokenService.get(ctx);

        await getUsuarioSession(token)
        .then(async (resposta) => {
            if(!resposta?.ok) throw new Error('Usuário ou senha inválidos!')
            const body = await resposta.body;
                     
        })
        .catch((err) => {
            console.error("Erro ao fazer login", err);
            throw err;
        })
    },

};