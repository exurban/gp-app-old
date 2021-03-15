import Image from "next/image";
import { Product } from "../graphql-operations";
import { Box, Flex, Grid, Heading, Text, Divider, Button, styled } from "bumbag";

type Props = {
  item: Product;
};

const BagItem: React.FC<Props> = ({ item }) => {
  const photo = item.photo;
  const image = photo.images[0];
  const print = item.print;
  const mat = item.mat;
  const frame = item.frame;
  const displayDimensions = image.isPortrait
    ? `${print.dimension1}"w x ${print.dimension2}"h`
    : `${print.dimension2}"w x ${print.dimension1}"h`;

  const StyledImage = styled(Image)`
    border-radius: 4px;
  `;

  return (
    <>
      <Grid width="100%" gridTemplateColumns="20% auto 10%" columnGap="2rem">
        <Box className="image-wrapper" overflow="hidden" position="relative">
          <StyledImage
            src={image.imageUrl}
            layout="fill"
            objectFit="contain"
            objectPosition="top"
            quality={80}
          />
        </Box>
        <Flex flexDirection="column" justifyContent="space-between">
          <Heading use="h5">{photo.title}</Heading>
          <Text.Block marginTop="major-2">{photo.description}</Text.Block>
          <Text.Block marginTop="major-2" fontSize="150">
            {print.type === "paper" ? "Exhibition Paper" : "Aluminum"}, {displayDimensions}
          </Text.Block>
          <Text.Block marginTop="major-2" fontSize="150">
            {mat?.description}
          </Text.Block>
          <Text.Block marginTop="major-2" fontSize="150">
            {frame?.description}
          </Text.Block>
        </Flex>
        <Flex
          fontWeight="700"
          fontSize="300"
          color="info500"
          paddingRight="12px"
          justifySelf="center"
        >
          ${item.totalRetailPrice}
        </Flex>
        <Button
          gridRow="2"
          gridColumn="3"
          size="small"
          variant="ghost"
          color="info500"
          justifySelf="center"
        >
          remove
        </Button>
      </Grid>
      <Divider marginY="major-3" />
    </>
  );
};

export default BagItem;
