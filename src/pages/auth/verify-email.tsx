import { Box, Flex, Heading, Text } from "bumbag";

const VerifyEmail: React.FC = () => {
  return (
    <>
      <Flex alignX="center">
        <Box width="90%" maxWidth="680px" height="200px" marginY="60px">
          <Heading>Check your email.</Heading>
          <Text>
            An email has been sent to the address you provided. Click the button in that email to
            sign in.
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default VerifyEmail;
