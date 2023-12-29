export async function HttpClient(fetchUrl, fetchOptions) {

    return fetch(fetchUrl, {
        ...fetchOptions,
        headers: { 
            ...fetchOptions.headers,
            'Content-Type': 'application/json'
        },
       
    })

        .then(async (resposta) => {
            console.log("RESPOPSTA SERVER", resposta)
            return {
                ok: resposta.ok, 
                status: resposta.status,
                body: await resposta.json()
            }
        });
}