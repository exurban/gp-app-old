import Head from "next/head";
import { PhotoInfoFragment } from "../graphql-operations";
import Image from "next/image";
import { Box, styled } from "bumbag";
import { NextSeo } from "next-seo";

const StyledImage = styled(Image)`
  border-radius: 20px;
`;

type Props = {
  photo: PhotoInfoFragment;
  idx: number;
};

const CarouselItem: React.FC<Props> = ({ photo, idx }) => {
  return (
    <>
      <NextSeo
        title={photo.title}
        description={photo.description}
        canonical="https://gibbs-photography.com"
        openGraph={{
          url: "http://localhost:3000/carousel/bloom?sku=1042",
          title: photo.title,
          description: photo.description,
          images: [
            {
              url: "http://localhost:3000/carousel/bloom?sku=1042",
              width: photo.images?.[0].width,
              height: photo.images?.[0].height,
              alt: photo.images?.[0].altText
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
      <Head>
        <title>{photo.title}</title>
      </Head>
      <Box
        className="item"
        data-value={idx}
        key={idx}
        height="100vh"
        // maxHeight="100%"
        alignY="center"
        margin="auto"
        style={{ overflowY: "hidden", overscrollBehaviorY: "none" }}
      >
        <StyledImage
          alt="demo"
          src={photo.images?.[0].imageUrl}
          layout="fill"
          objectFit="contain"
          quality={80}
        />
      </Box>
    </>
  );
};

export default CarouselItem;
