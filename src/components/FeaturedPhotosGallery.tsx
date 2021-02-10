import { useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import { PaginatedFeaturedPhotosDocument, PaginatedPhotosInput } from "../graphql-operations";
import { Stack, Heading, Text, Grid, Button, Icon } from "bumbag";
import Slide from "./Slide";
import Loader from "./Loader";

const FeaturedPhotosGallery: React.FC<{ input: PaginatedPhotosInput }> = ({ input }) => {
  const { loading, error, data } = useQuery(PaginatedFeaturedPhotosDocument, {
    variables: { input: input }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (data) {
    const photos = data.paginatedFeaturedPhotos.photos;

    // return <pre>{JSON.stringify(photos, null, 2)}</pre>;

    return (
      <>
        <Stack orientation="horizontal" marginY="major-4" alignX="right" width="90%">
          <Heading use="h4" alignY="bottom">
            <Text>{data.paginatedFeaturedPhotos.pageInfo.total} photos</Text>
          </Heading>
          <Button palette="primary" fontSize="500">
            <Icon icon="solid-expand" />
          </Button>
        </Stack>
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
  return <div>failed to load photos</div>;
};

export default FeaturedPhotosGallery;
