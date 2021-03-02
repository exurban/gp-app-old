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
  Box,
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
            Choose your material.
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
                style={{ columnGap: "8px" }}
              >
                <Text.Block fontSize="250" fontWeight="700" gridArea="1/1/1/1" alignSelf="flex-end">
                  Exhibition Paper
                </Text.Block>
                <Text.Block fontSize="150" color="info500" gridArea="2/1/2/1" marginTop="major-2">
                  from $170
                </Text.Block>
                <Text.Block gridColumn="2" gridRow="1/span 2" alignSelf="center">
                  The high-resolution image is printed in ink on fine-art quality paper. This paper
                  print may be ordered separately, or finished with your choice of a single mat and
                  wood or metal frame.
                </Text.Block>
              </Grid>
            </FinishCard>
            <FinishCard margin="major-1" userSelect="none">
              <Grid
                className="metal-print"
                gridTemplateColumns="25% 70%"
                style={{ columnGap: "8px" }}
              >
                <Text.Block fontSize="250" fontWeight="700" gridArea="1/1/1/1" alignSelf="flex-end">
                  Aluminum
                </Text.Block>
                <Text.Block fontSize="150" color="info500" gridArea="2/1/2/1" marginTop="major-2">
                  from $170
                </Text.Block>
                <Text.Block gridColumn="2" gridRow="1/span 2" alignSelf="center" fontWeight="400">
                  The high-resolution image is rendered by infusing dyes into the surface of a
                  specially-coated aluminum sheet. This aluminum print may be ordered separately, or
                  mounted in your choice of a float frame.
                </Text.Block>
              </Grid>
            </FinishCard>
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
                price: 170,
                value: "12x18"
              },
              {
                description: '16" x 24"',
                price: 215,
                value: "16x24"
              },
              {
                description: '20" x 30"',
                price: 280,
                value: "20x30"
              },
              {
                description: '30" x 45"',
                price: 360,
                value: "30x45"
              }
            ]}
          />
          <Divider marginTop="major-4" />
          <Flex>
            <Heading use="h5" marginY="major-3">
              Add a mat.
            </Heading>
            <Text.Block alignSelf="center" marginLeft="major-2" color="info500" fontWeight="500">
              +$40
            </Text.Block>
            <Text.Block
              use="i"
              alignSelf="center"
              marginLeft="major-1"
              color="textTint"
              fontWeight="300"
            >
              (optional)
            </Text.Block>
          </Flex>

          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            rowGap="2rem"
            columnGap="1rem"
            justifyItems="center"
            alignItems="start"
            justifyContent="space-evenly"
          >
            <Card>
              <img
                src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/mat_black.jpg"
                alt="Black Mat"
                width="170px"
                height="110px"
                style={{ borderRadius: "4px" }}
              />
              <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
                Black
              </Text.Block>
            </Card>
            <Card>
              <img
                src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/mat_grey.jpg"
                alt="Grey Mat"
                width="170px"
                height="110px"
                style={{ borderRadius: "4px" }}
              />
              <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
                Grey
              </Text.Block>
            </Card>
            <Card>
              <img
                src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/mat_white.jpg"
                alt="White Mat"
                width="170px"
                height="110px"
                style={{ borderRadius: "4px" }}
              />
              <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
                White
              </Text.Block>
            </Card>
          </Box>
          <Divider marginTop="major-4" />
          <Flex>
            <Heading use="h5" marginY="major-3">
              Add a frame.
            </Heading>
            <Text.Block alignSelf="center" marginLeft="major-2" color="info500" fontWeight="500">
              +$85
            </Text.Block>
            <Text.Block
              use="i"
              alignSelf="center"
              marginLeft="major-1"
              color="textTint"
              fontWeight="300"
            >
              (optional, price includes acrylic sheet to protect image)
            </Text.Block>
          </Flex>

          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            rowGap="2rem"
            columnGap="1rem"
            justifyItems="center"
            alignItems="start"
            justifyContent="space-evenly"
          >
            <Card>
              <img
                src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/wood_black.jpg"
                alt="Black Wood"
                width="150px"
                height="135px"
                style={{ borderRadius: "4px" }}
              />
              <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
                Black Wood
              </Text.Block>
            </Card>
            <Card>
              <img
                src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/wood_mocha.jpg"
                alt="Mocha Wood"
                width="150px"
                height="135px"
                style={{ borderRadius: "4px" }}
              />
              <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
                Mocha Wood
              </Text.Block>
            </Card>
            <Card>
              <img
                src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/wood_walnut.jpg"
                alt="Walnut Wood"
                width="150px"
                height="135px"
                style={{ borderRadius: "4px" }}
              />
              <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
                Walnut Wood
              </Text.Block>
            </Card>
            <Card>
              <img
                src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/wood_cherry.jpg"
                alt="Cherry Wood"
                width="150px"
                height="135px"
                style={{ borderRadius: "4px" }}
              />
              <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
                Cherry Wood
              </Text.Block>
            </Card>
            <Card>
              <img
                src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/wood_white.jpg"
                alt="White Wood"
                width="150px"
                height="135px"
                style={{ borderRadius: "4px" }}
              />
              <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
                White Wood
              </Text.Block>
            </Card>
            <Card>
              <img
                src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/metal_black.jpg"
                alt="Black Metal"
                width="150px"
                height="135px"
                style={{ borderRadius: "4px" }}
              />
              <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
                Black Metal
              </Text.Block>
            </Card>
            <Card>
              <img
                src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/metal_dark_pewter.jpg"
                alt="Dark Pewter Metal"
                width="150px"
                height="135px"
                style={{ borderRadius: "4px" }}
              />
              <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
                Dark Pewter Metal
              </Text.Block>
            </Card>
            <Card>
              <img
                src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/metal_light_pewter.jpg"
                alt="Light Pewter Metal"
                width="150px"
                height="135px"
                style={{ borderRadius: "4px" }}
              />
              <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
                Light Pewter Metal
              </Text.Block>
            </Card>
            <Card>
              <img
                src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/metal_silver.jpg"
                alt="Silver Metal"
                width="150px"
                height="135px"
                style={{ borderRadius: "4px" }}
              />
              <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
                Silver Metal
              </Text.Block>
            </Card>
          </Box>
          <Button palette="primary" width="120px" margin="40px 0 0 auto">
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
