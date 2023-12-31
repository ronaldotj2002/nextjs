
import nookies from 'nookies';

const TOKEN_KEY = 'TOKEN_KEY';
const NOME_USER = 'NOME_USER';

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR   = ONE_MINUTE * 60;
const ONE_DAY    = ONE_HOUR   * 24;
const ONE_YEAR   = ONE_DAY    * 365;


export const tokenService = {
    save(nome: string, token: string, ctx = null) {
        // globalThis?.localStorage?.setItem(TOKEN_KEY, token);
        globalThis?.sessionStorage?.setItem(TOKEN_KEY, token);
        globalThis?.sessionStorage?.setItem(NOME_USER, nome);
        nookies.set(ctx, TOKEN_KEY, token, {
            maxAge: ONE_DAY,
            path: '/',
        });
        nookies.set(ctx, NOME_USER, nome, {
            maxAge: ONE_DAY,
            path: '/',
        })
    },

    get(ctx = null) {
        const cookies = nookies.get(ctx);
        return cookies [TOKEN_KEY];
        
        // return sessionStorage.getItem('TOKEN_KEY');
    },
    getNome(ctx = null) {
        const nomesession = nookies.get(ctx);
        return nomesession [NOME_USER];
        
        // return sessionStorage.getItem('TOKEN_KEY');
    },

    delete(ctx = null) {
        globalThis?.localStorage?.removeItem(TOKEN_KEY);
        globalThis?.sessionStorage?.removeItem(TOKEN_KEY);
        nookies.destroy(ctx, TOKEN_KEY);

        globalThis?.localStorage?.removeItem(NOME_USER);
        globalThis?.sessionStorage?.removeItem(NOME_USER);
        nookies.destroy(ctx, NOME_USER);

    }

}