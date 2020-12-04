import { useRouter } from "next/router";
import Image from "next/image";
import ErrorMessage from "../../../components/ErrorMessage";
import { useQuery } from "@apollo/client";
import {
  AllPhotosByPhotographerDocument,
  AllPhotosByPhotographerInput
} from "../../../graphql-operations";
import { Heading, Paragraph, Flex, Text, Grid, Button, Icon } from "bumbag";
import Slide from "../../../components/Slide";
import Loader from "../../../components/Loader";

const PhotographerGallery: React.FC = () => {
  const router = useRouter();

  // * get photographer's name from router
  const { name } = router.query;
  console.log(name);

  const input = { name: name, take: 10 } as AllPhotosByPhotographerInput;

  const { loading, error, data } = useQuery(AllPhotosByPhotographerDocument, {
    variables: { input: input }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (data) {
    const photographer = data.allPhotosByPhotographer.photographerInfo;
    const photos = data.allPhotosByPhotographer.photos;
    const total = data.allPhotosByPhotographer.total;
    // const cursor = data.allPhotosByPhotographer.endCursor;
    // const imgUrl = photographer?.image?.imageUrl as string;
    // const txt = photographer?.image?.altText as string;
    // const w = photographer?.image?.width as number;
    // const h = photographer?.image?.height as number;

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
            <Flex marginRight="margin-3" height={260}>
              {/* <Image src={imgUrl} alt={txt} height={260} width={160} layout="fill" /> */}
              <div style={{ width: 90, height: 120 }}>
                <Image
                  src="/images/photographers/boyd.png"
                  height={120}
                  width={90}
                  layout="fixed"
                />
              </div>
            </Flex>
            <Flex flexFlow="column nowrap">
              <Heading
                use="h6"
                fontVariant="small-caps"
                marginLeft="major-3"
                marginBottom="major-2"
                color="gray100"
              >
                Photos taken by
              </Heading>
              <Heading use="h2" marginLeft="major-3">
                {photographer?.name}
              </Heading>
              <Heading use="h5" marginTop="major-1" marginLeft="major-3">
                {photographer?.email}
              </Heading>
              <Paragraph marginLeft="major-3">
                <Text>{photographer?.bio}</Text>
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

export default PhotographerGallery;
