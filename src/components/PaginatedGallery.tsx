import { useQuery, NetworkStatus } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import {
  PaginatedPhotosOfSubjectDocument,
  PaginatedPhotosOfSubjectInput,
  PaginatedPhotosOfSubjectResponse
} from "../graphql-operations";
import { Flex, Heading, Text, Button } from "bumbag";
// import Slide from "./Slide";
import Loader from "./Loader";

// const input = { name: "bird", take: 10 } as PaginatedPhotosOfSubjectInput;

const PaginatedGallery: React.FC<{ input: PaginatedPhotosOfSubjectInput }> = ({ input }) => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    PaginatedPhotosOfSubjectDocument,
    {
      variables: { input: input },
      notifyOnNetworkStatusChange: true
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
      <Flex flexDirection="column" width="90%" maxWidth="800px" marginX="auto" marginY="30px">
        <Heading>{subjectInfo.name.toUpperCase()}</Heading>
        {photos.map((photo, idx) => (
          <Flex key={photo.id} flexDirection="row">
            <Text>
              {idx + 1} - {photo.title}
            </Text>
          </Flex>
        ))}
        {hasMore && (
          <Button
            palette="primary"
            width="200px"
            marginY="30px"
            onClick={() => {
              fetchMore({
                variables: {
                  input: {
                    name: "bird",
                    take: 10,
                    cursor: pageInfo.endCursor
                  }
                }
              });
            }}
          >
            more
          </Button>
        )}
      </Flex>
    );

    //   return (
    //     <>
    //       <Stack orientation="horizontal" marginY="major-4" alignX="right" width="90%">
    //         <Heading use="h4" alignY="bottom">
    //           <Text>{photos.length} photos</Text>
    //         </Heading>
    //         <Button palette="primary" fontSize="500">
    //           <Icon icon="solid-expand" />
    //         </Button>
    //       </Stack>
    //       <Grid
    //         templateColumns="repeat(auto-fit, minmax(min(375px, 100%), max(700px)))"
    //         rowGap="5rem"
    //         columnGap="1rem"
    //         justifyContent="space-evenly"
    //         justifyItems="center"
    //         padding={{ default: "major-4", "max-tablet": "minor-1" }}
    //       >
    //         {photos.map(photo => (
    //           <Slide key={photo.id} photo={photo} />
    //         ))}
    //       </Grid>
    //     </>
    //   );
    // }
  }
  return null;
};

export default PaginatedGallery;
