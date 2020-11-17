import { signIn } from "next-auth/client";
import Link from "next/link";
import { usePage, Flex, Stack, Heading, Text, Button } from "bumbag";

const AccessDenied: React.FC = () => {
  const page = usePage();
  page.header.close();

  return (
    <Flex marginTop="major-4" marginX="auto" maxWidth="700px" width="90%">
      <Stack alignX="center">
        <Heading marginTop="major-4">Access Denied</Heading>
        <Heading use="h4">
          You must be signed in as an Administrator to view this page.
        </Heading>
        <Link href="/">
          <Button palette="primary">Return to main site</Button>
        </Link>
        <Button iconBefore="brands-google" onClick={() => signIn("google")}>
          <Text fontSize="150">Sign in with Google</Text>
        </Button>
      </Stack>
    </Flex>
  );
};

export default AccessDenied;
