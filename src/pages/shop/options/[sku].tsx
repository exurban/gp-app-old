import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import {
  PhotoWithSkuDocument,
  PhotoInfoFragment,
  ImageInfoFragment
} from "../../../graphql-operations";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";
import { NextSeo } from "next-seo";
import {
  Grid,
  Flex,
  Text,
  Heading,
  Link as BBLink,
  styled,
  applyTheme,
  Divider,
  Card,
  Button
} from "bumbag";

import OptionCards from "../../../components/OptionCards";

const ConfigureForPurchasePage: React.FC = () => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  // * get location's name from router
  const { sku } = router.query;

  let skuInt = 0;
  if (sku && typeof sku === "string") {
    skuInt = parseInt(sku);
  }

  useEffect(() => {
    if (selectedSize) {
      console.log(`selected size ${selectedSize}`);
    }
  }, [selectedSize, setSelectedSize]);

  const { loading, error, data } = useQuery(PhotoWithSkuDocument, {
    variables: { sku: skuInt }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (!data) return null;

  const photo: PhotoInfoFragment = data.photoWithSku;
  const image: ImageInfoFragment = photo.images[0];

  const pgName = photo?.photographer?.name as string;
  const locationName = photo?.location?.name as string;

  const StyledImage = styled(Image)`
    border-radius: 4px;
  `;

  return (
    <>
      <NextSeo
        title={`${photo.title}`}
        description={`${photo.description}`}
        openGraph={{
          url: "https://gibbs-photography.com/image/1115",
          images: [
            {
              url:
                "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1123-2.jpg"
            }
          ]
        }}
      />

      <Flex className="page-wrapper" width="100%" alignX="center" marginY="major-4">
        <Flex className="content-wrapper" width="90vw" maxWidth="720px" flexDirection="column">
          <StyledImage
            src={image.imageUrl}
            layout="intrinsic"
            width={image.width / 2}
            height={image.height / 2}
          />
          <Heading use="h2" textAlign="center" marginTop="major-4">
            {photo.title}
          </Heading>

          <Link href={`/gallery/photographer/${encodeURIComponent(pgName.toLowerCase())}`}>
            <BBLink>
              <Heading use="h5" marginBottom="major-2">
                {pgName}
              </Heading>
            </BBLink>
          </Link>

          <Text.Block marginBottom="major-3">
            <Link href={`/gallery/location/${encodeURIComponent(locationName.toLowerCase())}`}>
              <BBLink>
                <Text marginBottom="major-2" color="secondary">
                  {locationName}
                </Text>
              </BBLink>
            </Link>
          </Text.Block>
          <Text.Block fontSize="400" marginY="major-3">
            {photo.description}
          </Text.Block>
          <Divider />
          <Heading use="h5" marginY="major-3">
            Choose your finish.
          </Heading>
          <Flex
            className="finish-options-wrapper"
            flexDirection="column"
            width="100%"
            marginX="auto"
            marginBottom="major-3"
            justifyContent="space-around"
          >
            <FinishCard margin="major-1" userSelect="none">
              <Grid
                className="fine-art-print"
                gridTemplateColumns="25% 70%"
                rowGap="major-1"
                columnGap="major-1"
              >
                <Text.Block fontSize="250" fontWeight="700" gridArea="1/1/1/1">
                  Fine Art Print
                </Text.Block>
                <Text.Block fontSize="150" color="info500" gridArea="2/1/2/1">
                  from $250
                </Text.Block>
                <Text.Block gridArea="1/2/2/2" alignSelf="center">
                  Insert a 2-sentence description of this finish. Make it a little longer so it
                  appears more realistic for now.
                </Text.Block>
              </Grid>
            </FinishCard>
            <Button margin="major-1" userSelect="none" height="80px" textAlign="left">
              <Grid
                className="metal-print"
                gridTemplateColumns="25% 75%"
                rowGap="major-1"
                columnGap="major-1"
              >
                <Text.Block fontSize="250" fontWeight="700" gridArea="1/1/1/1">
                  Metal Print
                </Text.Block>
                <Text.Block fontSize="150" color="info500" gridArea="2/1/2/1">
                  from $275
                </Text.Block>
                <Text.Block gridArea="1/2/2/2" alignSelf="center" fontWeight="400">
                  Insert a 2-sentence description of this finish. Make it a little longer so it
                  appears more realistic for now.
                </Text.Block>
              </Grid>
            </Button>
          </Flex>
          <Divider />
          <Heading use="h5" marginY="major-3">
            Choose your size.
          </Heading>
          <OptionCards
            orientation="vertical"
            spacing="major-1"
            width="50%"
            alignX="center"
            setSelectedSize={setSelectedSize}
            sizeOptions={[
              {
                description: '12" x 18"',
                price: 350,
                value: "12x18"
              },
              {
                description: '16" x 24"',
                price: 600,
                value: "16x24"
              },
              {
                description: '20" x 30"',
                price: 900,
                value: "20x30"
              },
              {
                description: '30" x 45"',
                price: 1200,
                value: "30x45"
              }
            ]}
          />

          <Button palette="primary" width="120px" margin="16px 0 0 auto">
            Add to Bag
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default ConfigureForPurchasePage;

const FinishCard = applyTheme(Card, {
  styles: {
    base: {
      boxShadow: "none"
    }
  },
  defaultProps: {
    border: "3px solid",
    borderColor: "rgba(0, 0, 0, 0)",
    transition: "border-color 0.25s ease",
    _hover: {
      border: "3px solid",
      borderColor: "primary"
    }
  }
});
