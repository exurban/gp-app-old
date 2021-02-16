import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../graphql-operations";
import { Flex, Grid, Box, Icon, Heading, Button, Tooltip, useBreakpointValue } from "bumbag";
import { NextSeo } from "next-seo";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import GalleryHeader from "./GalleryHeader";
import Slide from "./Slide";

type Props = {
  input: AllPhotosOfSubjectInput;
};

const Gallery: React.FC<Props> = ({ input }) => {
  const router = useRouter();
  const size = useBreakpointValue({
    default: "default",
    "max-tablet": "small"
  });

  const { loading, error, data } = useQuery(AllPhotosOfSubjectDocument, {
    variables: {
      input: input
    }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (!data) return null;

  const { subjectInfo, total, photos } = data.allPhotosOfSubject;

  return (
    <>
      <NextSeo
        title="Welcome"
        description="Subconsciously articulating"
        canonical={`https://www.gibbs-photography.com`}
        openGraph={{
          url: `https://www.gibbs-photography.com`,
          title: "Welcome",
          description: "Subconsciously articulating",
          images: [
            {
              url:
                "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1169-1612571849332.webp",
              width: 1400,
              height: 935,
              alt: "welcome image"
            }
          ],
          site_name: "Gibbs Photography"
        }}
        twitter={{
          handle: "gibbs_photog",
          site: "https://gibbs-photography.com",
          cardType: "summary_large_image"
        }}
      />
      <Flex flexDirection="row" width="80vw" marginX="auto" marginTop="major-3">
        <GalleryHeader
          image={subjectInfo.coverImage}
          title={subjectInfo.name}
          description={subjectInfo.description}
        />
      </Flex>
      <Box
        width="100vw"
        backgroundColor="default"
        position="sticky"
        top="80px"
        paddingY="major-2"
        zIndex="2"
      >
        <Flex justifyContent="flex-end" alignItems="flex-end" width="80vw" marginX="auto">
          <Heading use="h4" marginRight="major-2">
            {total} photos
          </Heading>
          <Tooltip placement="bottom" content="View larger images in a carousel">
            <Button
              palette="primary"
              size={size}
              fontSize={{ default: "500", "max-tablet": "300" }}
              onClick={() =>
                router.push(`/carousel/${encodeURIComponent(subjectInfo.name.toLowerCase())}`)
              }
            >
              <Icon icon="solid-expand" />
            </Button>
          </Tooltip>
        </Flex>
      </Box>
      <Grid
        gridTemplateColumns={{
          default: "repeat(auto-fit, minmax(400px, 1fr))",
          "min-desktop": "repeat(auto-fit, minmax(500px, 2fr))",
          "min-fullHD": "repeat(auto-fill, minmax(500px, 3fr))"
        }}
        gridAutoFlow="row dense"
        rowGap={{ default: "5rem", "max-tablet": "2rem" }}
        columnGap="1rem"
        justifyContent="space-evenly"
        justifyItems="center"
        padding={{ default: "major-4", "max-tablet": "minor-1" }}
      >
        {photos.map((photo, idx) => (
          <Box
            width="100%"
            height="100%"
            padding={{
              default: "major-1",
              "max-Tablet": "minor-1"
            }}
            key={`${photo.id}-${idx}`}
            gridRow={photo.images[0].height > photo.images[0].width ? "auto / span 2" : "span 1"}
            gridColumn={
              photo.images[0].width / photo.images[0].height > 1.7 ? "auto / span 2" : "span 1"
            }
          >
            <Slide photo={photo} priority={idx < 10} />
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default Gallery;
