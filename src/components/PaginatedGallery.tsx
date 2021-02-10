import { useRouter } from "next/router";
import { useQuery, NetworkStatus } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import {
  PaginatedPhotosOfSubjectDocument,
  PaginatedPhotosOfSubjectInput
} from "../graphql-operations";
import { Flex, Grid, Box, Icon, Heading, Button, Tooltip } from "bumbag";
import GalleryHeader from "./GalleryHeader";
import Slide from "./Slide";
import Loader from "./Loader";

type Props = {
  input: PaginatedPhotosOfSubjectInput;
};

const PaginatedGallery: React.FC<Props> = ({ input }) => {
  const router = useRouter();

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    PaginatedPhotosOfSubjectDocument,
    {
      variables: { input: input },
      notifyOnNetworkStatusChange: true,
      ssr: false
    }
  );

  const loadingMorePhotos = networkStatus === NetworkStatus.fetchMore;

  if (loading && !loadingMorePhotos) {
    return Loader;
  }

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (data) {
    const { subjectInfo, pageInfo, photos } = data.paginatedPhotosOfSubject;
    const hasMore = photos.length < pageInfo.total;

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
              {pageInfo.total} photos
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

        {hasMore && (
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  input: {
                    ...input,
                    cursor: pageInfo.endCursor
                  }
                }
              });
            }}
          >
            more
          </Button>
        )}

        <Grid
          templateColumns="repeat(auto-fit, minmax(500px, 1fr))"
          rowGap="5rem"
          columnGap="1rem"
          justifyContent="space-evenly"
          justifyItems="center"
          padding={{ default: "major-4", "max-tablet": "minor-1" }}
        >
          {photos.map(photo => (
            <Box
              width="100%"
              key={photo.id}
              gridRow={photo.images[0].isPortrait ? "span 2 / auto" : "span 1"}
              gridColumn={photo.images[0].isPanoramic ? "span 2 / auto" : "span 1"}
            >
              <Slide photo={photo} />
            </Box>
          ))}
        </Grid>
      </>
    );
  }
  return null;
};

export default PaginatedGallery;
