import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../graphql-operations";
import { Flex, Grid, Box, Icon, Heading, Button, Tooltip } from "bumbag";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import GalleryHeader from "./GalleryHeader";
import Slide from "./Slide";

type Props = {
  input: AllPhotosOfSubjectInput;
};

const Gallery: React.FC<Props> = ({ input }) => {
  const router = useRouter();

  const { loading, error, data } = useQuery(AllPhotosOfSubjectDocument, {
    variables: {
      input: input
    }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (!data) return null;

  const { subjectInfo, total, photos } = data.allPhotosOfSubject;

  return (
    <>
      <Flex flexDirection="row" width="80vw" marginX="auto" marginTop="major-3">
        <GalleryHeader
          image={subjectInfo.coverImage}
          title={subjectInfo.name}
          description={subjectInfo.description}
        />
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
                router.push(`/carousel/${encodeURIComponent(subjectInfo.name.toLowerCase())}`)
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
        {photos.map(photo => (
          <Box
            width="100%"
            height="100%"
            key={photo.id}
            gridRow={photo.images[0].height > photo.images[0].width ? "auto / span 2" : "span 1"}
            gridColumn={photo.images[0].isPanoramic ? "span 2 / auto" : "span 1"}
          >
            <Slide photo={photo} />
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default Gallery;
