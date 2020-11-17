import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import nodemailer from "nodemailer";
import { html, text } from "./verificationRequest";
import { GraphQLClient } from "graphql-request";
import { GetApiTokenDocument, GetApiTokenInput } from "../../../typed-document-nodes";

const getApiToken = async (args: GetApiTokenInput): Promise<string> => {
  // console.log(`Requesting API token with ${JSON.stringify(args, null, 2)}`);
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

const options = {
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
      sendVerificationRequest: ({ identifier: email, url, token, site, provider }) => {
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
              html: html({ url, site, email })
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
  database:
    process.env.NODE_ENV === "production"
      ? process.env.API_URI
      : {
          type: "postgres",
          host: "localhost",
          port: 5432,
          username: "postgres",
          password: "postgres",
          database: "photos"
        },
  session: {
    jwt: true
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },

  callbacks: {
    signIn: async () => {
      console.log(`***SIGN IN***`);
      return Promise.resolve(true);
    },
    // redirect: async (url, baseUrl) => { return Promise.resolve(baseUrl) },
    jwt: async (token, user) => {
      console.log(`***JWT CALLBACK***`);
      token && console.log(`token: ${JSON.stringify(token, null, 2)}`);
      user && console.log(`user: ${JSON.stringify(user, null, 2)}`);
      // account && console.log(`account: ${JSON.stringify(account, null, 2)}`);
      // profile && console.log(`profile: ${JSON.stringify(profile, null, 2)}`);
      // isNewUser && console.log(`isNewUser: ${JSON.stringify(isNewUser, null, 2)}`);
      if (user && user !== undefined) {
        const signinArgs = {
          userId: user.id,
          email: user.email
        };

        const apiToken = await getApiToken(signinArgs);
        console.log(`received API token: ${JSON.stringify(apiToken, null, 2)}`);
        token = { ...token, accessToken: apiToken };
        console.log(`set token to ${JSON.stringify(token, null, 2)}`);
      }
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      console.log(`***SESSION***`);
      console.log(`USER: ${JSON.stringify(user, null, 2)}`);
      session.accessToken = user.accessToken;
      console.log(
        `USER: ${JSON.stringify(user, null, 2)}\nSESSION: ${JSON.stringify(session, null, 2)}`
      );
      return Promise.resolve(session);
    }
  },
  debug: true
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
