import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../graphql-operations";
import { Flex, Box, Icon, Text, Button, Tooltip, useBreakpointValue, useBreakpoint } from "bumbag";
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
    "max-desktop": "small"
  });
  const isMinDesktopAndOver = useBreakpoint("min-desktop");

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
          <Text.Block
            fontSize={{ default: "500", "max-desktop": "300" }}
            fontWeight={{ default: "500", "max-desktop": "300" }}
            marginRight="major-2"
          >
            {total} photos
          </Text.Block>
          <Tooltip placement="bottom" content="View larger images in a carousel">
            <Button
              palette="primary"
              aria-label="view larger in carousel"
              size={size}
              fontSize={{ default: "500", "max-desktop": "300" }}
              fontWeight={{ default: "500", "max-desktop": "300" }}
              onClick={() =>
                router.push(`/carousel/${encodeURIComponent(subjectInfo.name.toLowerCase())}`)
              }
            >
              <Icon icon="solid-expand" />
            </Button>
          </Tooltip>
        </Flex>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns={{
          default: "repeat(auto-fit, minmax(375px, 1fr))",
          "min-desktop": "repeat(auto-fit, minmax(500px, 2fr))",
          "min-fullHD": "repeat(auto-fill, minmax(500px, 3fr))"
        }}
        gridAutoFlow="row dense"
        rowGap={{ default: "5rem", "max-tablet": "2rem" }}
        columnGap="1rem"
        justifyContent="space-evenly"
        justifyItems="center"
        margin={{ default: "major-4", "max-tablet": "major-1" }}
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
              photo.images[0].width / photo.images[0].height > 1.7 && isMinDesktopAndOver
                ? "auto / span 2"
                : "span 1"
            }
          >
            <Slide photo={photo} priority={idx < 10} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Gallery;
