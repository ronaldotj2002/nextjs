// import type { NextAuthConfig } from "next-auth";

// export const authConfig = {
//     pages: {
//         signIn: '/login',
//     },
//     callbacks: {
//         authorized({ auth, request: { nextUrl } }) {
//             const isLoggedIn = !!auth?.user;
//             console.log("ISLOGGEDIN", isLoggedIn)
//             const isProtegido = nextUrl.pathname.startsWith('/financas');
//             console.log("isProtegido", isProtegido)
//             if(isProtegido) {
//                 if(isLoggedIn) return true;
//                 return false; // redirect to login page
//             } else if(isLoggedIn) {
//                 return Response.redirect(new URL('/financas,', nextUrl));
//             }
//             return true;

//         },
//     },
//     providers: [],
// } satisfies NextAuthConfig;