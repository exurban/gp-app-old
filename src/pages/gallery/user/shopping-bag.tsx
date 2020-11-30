import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import ErrorMessage from "../../../components/ErrorMessage";
import { useQuery } from "@apollo/client";
import { ShoppingBagItemsDocument } from "../../../graphql-operations";
import { Heading, Flex, Text, Grid, Button, Icon } from "bumbag";
import Slide from "../../../components/Slide";
import Loader from "../../../components/Loader";

const ShoppingBagGallery: React.FC = () => {
  const router = useRouter();
  const [session, sessionLoading] = useSession();

  if (typeof window !== "undefined" && sessionLoading) return null;

  if (typeof window !== "undefined" && !session) {
    router.push(`/auth/signin`);
  }

  const { loading, error, data } = useQuery(ShoppingBagItemsDocument);

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (data) {
    <pre>{JSON.stringify(data, null, 2)}</pre>;
    const photos = data.shoppingBagItems;
    console.log(`${photos?.length} photos in shopping bag.`);
    if (photos !== null && photos !== undefined && photos.length == 0) {
      return (
        <Flex
          flexFlow="row nowrap"
          width="80%"
          marginX="auto"
          marginY="major-4"
          justifyContent="space-between"
        >
          <Heading use="h2" marginLeft="major-1">
            Your bag is empty!
          </Heading>
        </Flex>
      );
    }

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
            Items in your shopping bag
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
          {photos?.map(photo => (
            <Slide key={photo.id} photo={photo} />
          ))}
        </Grid>
      </>
    );
  } else {
    return <p>Something bad happened.</p>;
  }
};

export default ShoppingBagGallery;
