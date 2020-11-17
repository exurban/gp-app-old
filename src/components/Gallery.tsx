import { useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import { PhotosOfSubjectDocument, SubjectInput } from "../typed-document-nodes";
import { Stack, Heading, Text, Grid, Button, Icon } from "bumbag";
import Slide from "./Slide";

const Gallery: React.FC<{ subject: SubjectInput }> = ({ subject }) => {
  const { loading, error, data } = useQuery(PhotosOfSubjectDocument, {
    variables: { input: subject }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <div>Loading</div>;

  if (data) {
    const photos = data.photosOfSubject.photosOfSubject;

    return (
      <>
        <Stack orientation="horizontal" marginY="major-4" alignX="right" width="90%">
          <Heading use="h4" alignY="bottom">
            <Text>{photos.length} photos</Text>
          </Heading>
          <Button palette="primary" fontSize="500">
            <Icon icon="solid-expand" />
          </Button>
        </Stack>
        <Grid
          templateColumns="repeat(auto-fit, minmax(min(600px, 100%), 1fr))"
          rowGap="5rem"
          columnGap="1rem"
          justifyContent="space-evenly"
          justifyItems="center"
          padding={{ default: "major-4", "max-tablet": "minor-1" }}
        >
          {photos.map(photo => (
            <Slide key={photo.photo.id} {...photo} />
          ))}
        </Grid>
      </>
    );
  }
  return <div>failed to load photos</div>;
};

export default Gallery;
