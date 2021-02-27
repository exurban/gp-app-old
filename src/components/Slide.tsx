import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, styled } from "bumbag";
import SlideMenu from "./SlideMenu";
import { PhotoInfoFragment } from "../graphql-operations";

const ImageContainer = styled(Box)`
  width: 100%;
  position: relative;
`;

const Slide: React.FC<{ photo: PhotoInfoFragment; priority: boolean }> = ({ photo, priority }) => {
  const router = useRouter();

  const showInCarousel = () => {
    let { pathname } = router;
    if (!pathname || typeof pathname !== "string") {
      return;
    }

    if (pathname.includes(`gallery`)) {
      pathname = pathname.replace(`gallery`, `carousel`);
    }

    if (pathname.includes(`/[name]`)) {
      pathname = pathname.replace(`/[name]`, "");
      const { name } = router.query;

      router.push({
        pathname: `${pathname}/${name}`,
        query: { sku: photo?.sku }
      });
    } else {
      router.push({
        pathname: `${pathname}/`,
        query: { sku: photo?.sku }
      });
    }
  };

  if (photo.images === undefined || photo.images === null) {
    return null;
  }

  const img = photo.images[0];

  return (
    <>
      <Flex className="image+button" onDoubleClick={() => showInCarousel()}>
        <ImageContainer borderRadius="6px" overflow="hidden" altitude="400">
          <Image
            src={img.imageUrl}
            alt={img.altText}
            layout="responsive"
            width={img.width}
            height={img.height}
            priority={priority}
            sizes="(max-width: 400px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 34vw, 25vw"
          />
        </ImageContainer>
        <SlideMenu photo={photo} />
      </Flex>
    </>
  );
};

export default Slide;
