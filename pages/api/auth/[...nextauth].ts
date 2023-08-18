import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "@/database"



export const authOptions = {

  providers: [

    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {label: 'Correo:', type: 'email', placeholder: 'Correo@google.com'},
        password: {label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'},
      },
      
      async authorize(credentials){

        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password ) as any;


      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),



  ],


  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  jwt: {

  },

  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt' as any ,
    updateAge: 86400, // cada día
  },


  //callbacks
  callbacks: {

    async jwt({token, account, user}: any){

      if (account) {
        token.accessToken = account.access_token;

        switch(account.type) {

          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
          case 'credentials':
            token.user = user;
            break;
        }

      }

      return token;
    },

    async session({session, token, user }: any) {

      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    }

  }

}

export default NextAuth(authOptions)