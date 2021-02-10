import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, styled } from "bumbag";
import SlideInfo from "./SlideInfo";
import SlideMenu from "./SlideMenu";
import { PhotoInfoFragment } from "../graphql-operations";

const ImageContainer = styled(Box)`
  width: 100%;
  position: relative;
`;

const Slide: React.FC<{ photo: PhotoInfoFragment }> = ({ photo }) => {
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();

  if (photo.images === undefined || photo.images === null) {
    return null;
  }

  const img = photo.images[0];

  return (
    <>
      {showInfo ? (
        <SlideInfo photo={photo} setShowInfo={setShowInfo} />
      ) : (
        <Flex className="image+button" onDoubleClick={() => router.push(`/image/${photo.sku}`)}>
          <ImageContainer borderRadius="6px" overflow="hidden" altitude="400">
            <Image
              src={img.imageUrl}
              alt={img.altText}
              layout="responsive"
              width={img.width}
              height={img.height}
              sizes="(max-width: 700px) 100vw, 1400px"
            />
          </ImageContainer>
          <SlideMenu photo={photo} setShowInfo={setShowInfo} />
        </Flex>
      )}
    </>
  );
};

export default Slide;
