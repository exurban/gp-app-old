import Link from "next/link";
import Image from "next/image";
import { Heading, Paragraph, Button, Flex, Text } from "bumbag";
import { NextSeo } from "next-seo";

const IndexPage: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Welcome"
        description="Subconsciously articulating"
        canonical={`https://www.gibbs-photography.com`}
        openGraph={{
          url: `https://www.gibbs-photography.com`,
          title: "Welcome",
          description: "Subconsciously articulating",
          images: [
            {
              url:
                "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1169-1612571849332.webp",
              width: 1400,
              height: 935,
              alt: "welcome image"
            }
          ],
          site_name: "Gibbs Photography"
        }}
        twitter={{
          handle: "gibbs_photog",
          site: "https://gibbs-photography.com",
          cardType: "summary_large_image"
        }}
      />
      <Flex
        alignX="center"
        width="100vw"
        height="40vh"
        background="#569ad6"
        position="relative"
        overflow="hidden"
        zIndex={-1}
      >
        <Image
          // src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1090-1612563207994.webp"
          // src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1169-1612571849332.webp"
          src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1089-1612563104512.webp"
          alt="Hero"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </Flex>

      <Flex
        flexDirection="column"
        maxWidth="768px"
        width="90%"
        alignX="center"
        marginX="auto"
        marginY="60px"
      >
        <Heading>Welcome</Heading>
        <Paragraph marginTop="30px">
          <Text.Block fontSize="300">
            Nature scenes are the creative inspiration for photographers Boyd and Scott Gibbs, a
            father-son team. From single subjects to vast landscapes, their works convey both the
            ephemeral and enduring qualities of the American wilderness.
          </Text.Block>
        </Paragraph>
        <Link href="/gallery/featured" passHref={true}>
          <Button
            size="large"
            palette="primary"
            color="white"
            altitude="200"
            marginY="60px"
            marginX="auto"
            width="60vw"
            maxWidth="400px"
          >
            Enter the Gallery
          </Button>
        </Link>
      </Flex>
    </>
  );
};

export default IndexPage;
