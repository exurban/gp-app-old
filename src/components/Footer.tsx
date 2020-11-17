import Link from "next/link";
import { Flex, Stack, Divider, Text } from "bumbag";

const Footer: React.FC = () => {
  return (
    <>
      <Divider borderWidth="2px" borderColor="primary" />
      <Flex backgroundColor="black200" color="white900" alignX="center" paddingY="25px">
        <Flex className="footer-link-container" justifyContent="space-around" width="768px">
          <Text fontSize="100" color="gray100">
            &#169; 2020 Gibbs Photography, LLC
          </Text>
          <Stack spacing="major-2">
            <Link href="/legal/" passHref={true}>
              <Text.Block>
                <Text
                  fontSize="100"
                  color="gray100"
                  _hover={{ color: "primary", cursor: "pointer" }}
                >
                  Privacy Policy
                </Text>
              </Text.Block>
            </Link>
            <Link href="/legal/" passHref={true}>
              <Text.Block>
                <Text
                  fontSize="100"
                  color="gray100"
                  _hover={{ color: "primary", cursor: "pointer" }}
                >
                  Terms of Service
                </Text>
              </Text.Block>
            </Link>
          </Stack>
          <Stack spacing="major-2">
            <Link href="/legal/" passHref={true}>
              <Text.Block>
                <Text
                  fontSize="100"
                  color="gray100"
                  _hover={{ color: "primary", cursor: "pointer" }}
                >
                  Subscribe to newsletter
                </Text>
              </Text.Block>
            </Link>
            <Link href="/legal/" passHref={true}>
              <Text.Block>
                <Text
                  fontSize="100"
                  color="gray100"
                  _hover={{ color: "primary", cursor: "pointer" }}
                >
                  Contact us
                </Text>
              </Text.Block>
            </Link>
          </Stack>
          <Link href="http://exurban.io" passHref={true}>
            <Text.Block>
              <Text fontSize="150" color="gray100" _hover={{ color: "primary", cursor: "pointer" }}>
                Built by (ex)urban
              </Text>
            </Text.Block>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default Footer;
