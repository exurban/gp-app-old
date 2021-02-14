import Link from "next/link";
import Image from "next/image";
import { Heading, Paragraph, Button, Flex, Stack } from "bumbag";

const IndexPage: React.FC = () => {
  return (
    <>
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

      <Flex maxWidth="768px" width="90%" alignX="center" marginX="auto" marginY="40px">
        <Stack alignX="center">
          <Heading>Welcome!</Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis nibh ipsum sit vel
            eget ultrices pellentesque ipsum amet. Nunc, bibendum enim netus mauris, libero id ipsum
            viverra habitasse. Faucibus tellus enim nec luctus porta turpis quisque tempor, ac. Eget
            egestas aliquam risus eu, ullamcorper magna viverra. Suscipit ornare vestibulum nullam
            commodo et iaculis gravida. Magna dictum lorem id ut tortor. Sed adipiscing mauris enim
            vestibulum, etiam. At euismod orci egestas sed lectus amet, blandit. Aliquet nisi
            egestas suscipit turpis facilisis. Turpis suspendisse amet ipsum, quam et sed felis
            urna. Montes, ultricies ut justo quis est. Consectetur ut massa amet porttitor. Magna
            vitae, fringilla tortor in consectetur et nisi. Donec aliquam ac.
          </Paragraph>
          <Link href="/gallery/featured" passHref={true}>
            <Button size="large" palette="info500" color="white" altitude="200" marginBottom="60px">
              Enter the Gallery
            </Button>
          </Link>
        </Stack>
      </Flex>
    </>
  );
};

export default IndexPage;
