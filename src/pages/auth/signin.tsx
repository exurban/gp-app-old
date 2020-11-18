import { useState } from "react";
import { useSession, signIn } from "next-auth/client";
import Head from "next/head";

import {
  Icon,
  Input,
  FieldWrapper,
  Stack,
  Flex,
  Divider,
  Heading,
  Button,
  Paragraph,
  Text
} from "bumbag";

const SignIn: React.FC = () => {
  const [session, loading] = useSession();
  const [email, setEmail] = useState("");

  // eslint-disable-next-line
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  if (loading) return <Heading>One moment please while we complete sign in.</Heading>;

  // ! TO DO:
  // Google, Apple and email redirect to this page after successful login and they have token info at this point. Before redirecting to the page the user was on before signing in, sign in to the API server. Store the returned JWT in local storage.

  // Sign in flow: User clicks continue with Apple, Google or email, consents and JWT is issued. Auth provider redirects to this page after issuing token. This page will reload, but with a session. So, if (session), send a request to the API login router, take info from the JWT and send API signin request to the API, which returns a JWT, which we'll store in local storage before redirecting back to the page the user was on before beginning the sign in process.

  if (session) {
    console.log(`Reloading after APP sign in.`);
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta
          name="sign in"
          content="Member sign in to add to favorites and shopping bag and to purchase art."
        />
      </Head>
      <Flex minHeight="calc(100vh - 220px)">
        <Stack
          className="stack-bjg"
          maxWidth="650px"
          marginX="auto"
          marginY="auto"
          alignX="center"
          spacing="major-2"
        >
          <>
            <Flex alignY="center" marginTop="major-5">
              <Icon icon="gpLogo" fontSize="900" marginRight="major-3" />
              <Heading marginTop="major-1">Sign in.</Heading>
            </Flex>

            <Stack spacing="major-4" width="320px" marginY="major-5">
              <Paragraph>
                Please sign in to share photos or add them to your favorites or shopping bag.
              </Paragraph>
            </Stack>
            <Stack spacing="major-3" alignX="center" width="320px">
              <Button
                width="100%"
                palette="secondary"
                iconBefore="brands-google"
                borderRadius="4px"
                onClick={() => signIn("google")}
              >
                <Text fontSize="150">Continue with Google</Text>
              </Button>

              <Button
                width="100%"
                iconBefore="brands-apple"
                borderRadius="4px"
                onClick={() => signIn("apple")}
              >
                <Text fontSize="150">Continue with Apple</Text>
              </Button>

              <Divider />

              <FieldWrapper
                label={<Text fontSize="100">Email</Text>}
                width="100%"
                borderRadius="4px"
              >
                <Input
                  name="email"
                  value={email}
                  onChange={onChange}
                  type={email}
                  placeholder="Enter your email address... "
                  width="100%"
                />
              </FieldWrapper>
              <Button
                type="submit"
                width="100%"
                variant="outlined"
                palette="secondary"
                borderRadius="4px"
                onClick={() => signIn("email", { email: email })}
              >
                <Text fontSize="150">Continue with email</Text>
              </Button>
            </Stack>
            <Text fontSize="100" color="text100" marginTop="80px" textAlign="center">
              By clicking "Continue with Google / Apple / email" above, you acknowledge that you
              have read and understood and agree to Gibbs Photography's Terms & Conditions and
              Privacy Policy.
            </Text>
          </>
        </Stack>
      </Flex>
    </>
  );
};

export default SignIn;
