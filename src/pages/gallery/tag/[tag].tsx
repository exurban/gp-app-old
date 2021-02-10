import { useRouter } from "next/router";
import ErrorMessage from "../../../components/ErrorMessage";
import { useQuery } from "@apollo/client";
import { AllPhotosWithTagDocument, AllPhotosWithTagInput } from "../../../graphql-operations";
import { Heading, Flex, Text, Grid, Button, Icon } from "bumbag";
import Slide from "../../../components/Slide";

const TagGallery: React.FC = () => {
  const router = useRouter();

  // * get tag from router
  const { tag } = router.query;
  const tagInput = { tag: tag, take: 10 } as AllPhotosWithTagInput;

  const { loading, error, data } = useQuery(AllPhotosWithTagDocument, {
    variables: { input: tagInput }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <div>Loading</div>;

  if (data) {
    const tag = data.allPhotosWithTag.tagInfo;
    const photos = data.allPhotosWithTag.photos;
    const total = data.allPhotosWithTag.total;
    // const cursor = data.allPhotosWithTag.endCursor;

    // return <pre>{JSON.stringify(photos, null, 2)}</pre>;
    return (
      <>
        <Flex
          flexFlow="row nowrap"
          width="80%"
          marginX="auto"
          marginY="major-4"
          justifyContent="space-between"
        >
          <Heading use="h2" marginLeft="major-1">
            All Photos Tagged "{tag.name}"
          </Heading>
          <Flex>
            <Heading use="h4" alignY="bottom" marginRight="major-1">
              <Text>{total} photos</Text>
            </Heading>
            <Button palette="primary" fontSize="500">
              <Icon icon="solid-expand" />
            </Button>
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
  } else {
    return <p>Something bad happened.</p>;
  }
};

export default TagGallery;
