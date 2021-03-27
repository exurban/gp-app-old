import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import NextAuth, { InitOptions, User } from "next-auth";
import Providers from "next-auth/providers";
import nodemailer from "nodemailer";
import { html, text } from "./verificationRequest";
import { GraphQLClient } from "graphql-request";
import { GetApiTokenDocument, GetApiTokenInput } from "../../../graphql-operations";

const getApiToken = async (args: GetApiTokenInput) => {
  console.log(`Requesting API token with ${JSON.stringify(args, null, 2)}`);
  const api = process.env.API_URI as string;
  const graphQLClient = new GraphQLClient(api);

  const input = {
    input: {
      ...args
    }
  };
  // console.log(`Sending request with input: ${JSON.stringify(input, null, 2)}`);

  const token = await graphQLClient.request(GetApiTokenDocument, input);

  return token.getApiToken;
};

interface GPUser extends User {
  id: number;
  accessToken?: string;
}

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    Providers.Apple({
      clientId: process.env.APPLE_ID as string,
      clientSecret: {
        appleId: process.env.APPLE_ID as string,
        teamId: process.env.APPLE_TEAM_ID as string,
        privateKey: process.env.APPLE_PRIVATE_KEY as string,
        keyId: process.env.APPLE_KEY_ID as string
      }
    }),
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: ({ identifier: email, url, provider }) => {
        return new Promise((resolve, reject) => {
          const { server, from } = provider;
          // Strip protocol from URL and use domain as site name
          const site = `Gibbs Photography`;

          nodemailer.createTransport(server).sendMail(
            {
              to: email,
              from,
              subject: `Sign in to ${site}`,
              text: text({ url, site }),
              html: html({ url, email })
            },
            error => {
              if (error) {
                return reject(
                  new Error(`SEND_VERIFICATION_EMAIL_ERROR ${JSON.stringify(error, null, 2)}`)
                );
              }
              return resolve();
            }
          );
        });
      }
    })
  ],
  // * remote DB config
  database: {
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    synchronize: true,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  },
  // * Local DB Config
  // database: {
  //   type: "postgres",
  //   host: "localhost",
  //   port: 5432,
  //   username: "postgres",
  //   password: "postgres",
  //   database: "photos-new"
  // },
  session: {
    jwt: true
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-email"
  },
  callbacks: {
    // redirect: async (url, baseUrl) => { return Promise.resolve(baseUrl) },
    jwt: async (token, user: GPUser) => {
      if (user && user !== undefined) {
        const signinArgs = {
          userId: user.id,
          email: user.email as string
        };

        const apiToken = await getApiToken(signinArgs);

        token = { ...token, accessToken: apiToken };
      }
      return Promise.resolve(token);
    },
    session: async (session, user: GPUser) => {
      session.accessToken = user.accessToken;

      return Promise.resolve(session);
    }
  },
  debug: true
};

const authHandler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
export default authHandler;
