import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import ErrorMessage from "../../../components/ErrorMessage";
import { useQuery } from "@apollo/client";
import { FavoritesDocument } from "../../../graphql-operations";
import { Heading, Flex, Text, Grid, Button, Icon } from "bumbag";
import Slide from "../../../components/Slide";
import Loader from "../../../components/Loader";

const FavoritesGallery: React.FC = () => {
  const router = useRouter();
  const [session, sessionLoading] = useSession();

  if (typeof window !== "undefined" && sessionLoading) return null;

  if (typeof window !== "undefined" && !session) {
    router.push(`/auth/signin`);
  }

  const { loading, error, data } = useQuery(FavoritesDocument);

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (data) {
    const photos = data.favorites?.photoList;

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
            Your Favorites
          </Heading>
          <Flex>
            <Heading use="h4" alignY="bottom" marginRight="major-1">
              <Text>{photos?.length} photos</Text>
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
          {photos?.map((photo, idx) => (
            <Slide key={photo.id} photo={photo} priority={idx < 10} />
          ))}
        </Grid>
      </>
    );
  } else {
    return <p>Something bad happened.</p>;
  }
};

export default FavoritesGallery;
