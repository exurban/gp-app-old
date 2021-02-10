import { useRouter } from "next/router";
import Image from "next/image";

import { useQuery } from "@apollo/client";
import { AllPhotosAtLocationDocument, AllPhotosAtLocationInput } from "../../../graphql-operations";
import { Heading, Paragraph, Flex, Text, Grid, Button, Icon } from "bumbag";
import Slide from "../../../components/Slide";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";

const LocationGallery: React.FC = () => {
  const router = useRouter();

  // * get location's name from router
  const { name } = router.query;
  console.log(name);

  const input = { name: name, take: 10 } as AllPhotosAtLocationInput;

  const { loading, error, data } = useQuery(AllPhotosAtLocationDocument, {
    variables: { input: input }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (data) {
    const location = data.allPhotosAtLocation.locationInfo;
    const photos = data.allPhotosAtLocation.photos;
    const total = data.allPhotosAtLocation.total;
    // const cursor = data.allPhotosAtLocation.endCursor;
    const imgUrl = location.coverImage?.imageUrl as string;
    const txt = location.coverImage?.altText as string;
    // const w = location?.mapImage?.width as number;
    // const h = location?.mapImage?.height as number;

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
          <Flex flexFlow="row nowrap">
            <Flex marginRight="margin-3">
              {imgUrl ? (
                <Image src={imgUrl} alt={txt} height={120} width={90} layout="fixed" />
              ) : null}
            </Flex>
            <Flex flexFlow="column nowrap" maxWidth="680px">
              <Heading
                use="h6"
                fontVariant="small-caps"
                marginLeft="major-3"
                marginBottom="major-2"
                color="gray100"
              >
                Photos taken at
              </Heading>
              <Heading use="h2" marginLeft="major-3">
                {location.name}
              </Heading>
              <Paragraph marginLeft="major-3">
                <Text>{location.description}</Text>
              </Paragraph>
            </Flex>
          </Flex>

          <Flex alignItems="flex-end" justifySelf="end">
            <Heading use="h4" marginRight="major-2">
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

export default LocationGallery;
