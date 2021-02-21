import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useQuery } from "@apollo/client";
import { FavoritesDocument } from "../../../graphql-operations";
import {
  Heading,
  Box,
  Flex,
  Button,
  Icon,
  useBreakpointValue,
  useBreakpoint,
  Tooltip
} from "bumbag";
import Slide from "../../../components/Slide";
import ErrorMessage from "../../../components/ErrorMessage";
import Loader from "../../../components/Loader";

const FavoritesGallery: React.FC = () => {
  const router = useRouter();
  const [session] = useSession();
  const size = useBreakpointValue({
    default: "default",
    "max-tablet": "small"
  });
  const isMinDesktopAndOver = useBreakpoint("min-desktop");

  // if (typeof window !== "undefined" && sessionLoading) return null;

  if (typeof window !== "undefined" && !session) {
    router.push(`/auth/signin`);
  }

  const { loading, error, data } = useQuery(FavoritesDocument);

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (!data) return null;

  const photos = data.favorites?.photoList;

  return (
    <>
      <Box
        width="100vw"
        backgroundColor="default"
        position="sticky"
        top="80px"
        paddingY="major-2"
        zIndex="2"
      >
        <Flex justifyContent="flex-end" alignItems="flex-end" width="80vw" marginX="auto">
          {photos && (
            <Heading use="h4" marginRight="major-2">
              {photos.length} photos
            </Heading>
          )}
          <Tooltip placement="bottom" content="View larger images in a carousel">
            <Button
              palette="primary"
              aria-label="view larger in carousel"
              size={size}
              fontSize={{ default: "500", "max-tablet": "300" }}
              onClick={() => router.push(`/carousel/user/favorites`)}
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
        {photos?.map((photo, idx) => (
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

export default FavoritesGallery;
