import { useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import { SubjectWithNameDocument, SubjectInput } from "../graphql-operations";
import { Stack, Heading, Text, Grid, Button, Icon } from "bumbag";
import Slide from "./Slide";

const Gallery: React.FC<{ subject: SubjectInput }> = ({ subject }) => {
  const { loading, error, data } = useQuery(SubjectWithNameDocument, {
    variables: { input: subject }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <div>Loading</div>;

  if (data) {
    const subject = data.subjectWithName;
    const photoSubjects = subject.photosOfSubject;
    const photos = photoSubjects.map(x => x.photo);

    // return <pre>{JSON.stringify(photos, null, 2)}</pre>;

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
            <Slide key={photo.id} photo={photo} />
          ))}
        </Grid>
      </>
    );
  }
  return <div>failed to load photos</div>;
};

export default Gallery;
