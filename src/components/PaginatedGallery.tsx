import { useQuery, NetworkStatus } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import {
  PaginatedPhotosOfSubjectDocument,
  PaginatedPhotosOfSubjectInput
} from "../graphql-operations";
import { Flex, Grid, Icon, Heading, Text, Button } from "bumbag";
import Slide from "./Slide";
import Loader from "./Loader";

type Props = {
  input: PaginatedPhotosOfSubjectInput;
};

const PaginatedGallery: React.FC<Props> = ({ input }) => {
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

    // return (
    //   <Flex flexDirection="column" width="90%" maxWidth="800px" marginX="auto" marginY="30px">
    //     <Heading>{subjectInfo.name.toUpperCase()}</Heading>
    //     {photos.map((photo, idx) => (
    //       <Flex key={photo.id} flexDirection="row">
    //         <Text>
    //           {idx + 1} - {photo.title}
    //         </Text>
    //       </Flex>
    //     ))}
    //     {hasMore && (
    //       <Button
    //         palette="primary"
    //         width="200px"
    //         marginY="30px"
    //         onClick={() => {
    //           fetchMore({
    //             variables: {
    //               input: {
    //                 ...input,
    //                 cursor: pageInfo.endCursor
    //               }
    //             }
    //           });
    //         }}
    //       >
    //         more
    //       </Button>
    //     )}
    //   </Flex>
    // );

    return (
      <>
        <Flex
          direction="row"
          width="90%"
          marginX="auto"
          marginY="major-3"
          justifyContent="space-between"
          alignContent="center"
        >
          <Heading use="h3">{subjectInfo.name}</Heading>
          <Flex>
            <Heading use="h4" alignY="bottom" marginRight="major-4">
              <Text>{photos.length} photos</Text>
            </Heading>
            {hasMore && (
              <Button
                palette="primary"
                fontSize="500"
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
                <Icon icon="solid-expand" />
              </Button>
            )}
          </Flex>
        </Flex>
        <Grid
          templateColumns="repeat(auto-fit, minmax(min(375px, 100%), max(700px)))"
          rowGap="5rem"
          columnGap="1rem"
          justifyContent="space-evenly"
          justifyItems="center"
          padding={{ default: "major-4", "max-tablet": "minor-1" }}
        >
          {photos.map(photo => (
            <Slide key={photo.id} photo={photo} />
          ))}
        </Grid>
      </>
    );
  }
  return null;
};

export default PaginatedGallery;
