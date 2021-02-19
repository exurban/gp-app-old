import { useRouter } from "next/router";
import {
  Heading,
  Flex,
  Box,
  Tooltip,
  Button,
  Icon,
  useBreakpointValue,
  useBreakpoint
} from "bumbag";
import { ImageInfoFragment, PhotoInfoFragment } from "../graphql-operations";
import GalleryHeader from "./GalleryHeader";
import Slide from "./Slide";

type Props = {
  coverImage: ImageInfoFragment | null | undefined;
  name: string;
  description: string;
  total: number;
  photos: Array<PhotoInfoFragment>;
};

const SectionGallery: React.FC<Props> = ({ coverImage, name, description, total, photos }) => {
  const router = useRouter();
  const section = router.pathname.split("/")[2];

  const size = useBreakpointValue({
    default: "default",
    "max-tablet": "small"
  });
  const isMinDesktopAndOver = useBreakpoint("min-desktop");

  return (
    <>
      <Flex flexDirection="row" width="80vw" marginX="auto" marginTop="major-3">
        <GalleryHeader image={coverImage} title={name} description={description} />
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
              aria-label="view larger in carousel"
              size={size}
              fontSize={{ default: "500", "max-tablet": "300" }}
              onClick={() =>
                router.push(
                  `/carousel/${encodeURIComponent(section.toLowerCase())}/${encodeURIComponent(
                    name.toLowerCase()
                  )}`
                )
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

export default SectionGallery;
