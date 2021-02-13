import { useRouter } from "next/router";
import { Heading, Flex, Box, Tooltip, Grid, Button, Icon } from "bumbag";
import { ImageInfoFragment, PhotoInfoFragment } from "../graphql-operations";
import GalleryHeader from "./GalleryHeader";
import Slide from "./Slide";

type Props = {
  coverImage: ImageInfoFragment | null | undefined;
  name: string;
  description: string;
  total: number;
  photos: Array<PhotoInfoFragment>;
};

const SectionGallery: React.FC<Props> = ({ coverImage, name, description, total, photos }) => {
  const router = useRouter();
  const section = router.pathname.split("/")[2];

  return (
    <>
      <Flex flexDirection="row" width="80vw" marginX="auto" marginTop="major-3">
        <GalleryHeader image={coverImage} title={name} description={description} />
      </Flex>
      <Box
        width="100vw"
        backgroundColor="default"
        position="sticky"
        top="80px"
        paddingY="major-2"
        zIndex="999"
      >
        <Flex justifyContent="flex-end" alignItems="flex-end" width="80vw" marginX="auto">
          <Heading use="h4" marginRight="major-2">
            {total} photos
          </Heading>
          <Tooltip placement="bottom" content="View larger images in a carousel">
            <Button
              palette="primary"
              fontSize="500"
              onClick={() =>
                router.push(`/carousel/${section}/${encodeURIComponent(name.toLowerCase())}`)
              }
            >
              <Icon icon="solid-expand" />
            </Button>
          </Tooltip>
        </Flex>
      </Box>
      <Grid
        gridTemplateColumns="repeat(auto-fit, minmax(700px, 1fr))"
        gridTemplateRows="520px"
        gridAutoFlow="row dense"
        rowGap="5rem"
        columnGap="1rem"
        justifyContent="space-evenly"
        justifyItems="center"
        padding={{ default: "major-4", "max-tablet": "minor-1" }}
      >
        {photos.map((photo, idx) => (
          <Box
            width="100%"
            height="100%"
            key={`${photo.id}-${idx}`}
            gridRow={photo.images[0].height > photo.images[0].width ? "auto / span 2" : "span 1"}
            gridColumn={
              photo.images[0].width / photo.images[0].height > 1.7 ? "auto / span 2" : "span 1"
            }
          >
            <Slide photo={photo} priority={idx < 10} />
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default SectionGallery;
