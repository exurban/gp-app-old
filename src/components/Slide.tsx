import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, styled } from "bumbag";
import SlideInfo from "./SlideInfo";
import SlideMenu from "./SlideMenu";
import { PhotoInfoFragment } from "../graphql-operations";

const StyledImage = styled(Image)`
  border-radius: 6px;
`;

const Slide: React.FC<{ photo: PhotoInfoFragment }> = ({ photo }) => {
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();

  let img;
  if (photo.images !== undefined && photo.images !== null) {
    img = photo.images[0];
  }

  return (
    <>
      {showInfo ? (
        <SlideInfo photo={photo} setShowInfo={setShowInfo} />
      ) : (
        <Flex
          className="image+button"
          direction="row"
          justifySelf="start"
          alignSelf="start"
          onDoubleClick={() => router.push(`/image/${photo.sku}`)}
        >
          {img ? (
            <StyledImage
              src={img.imageUrl}
              alt={img.altText}
              width={img.width}
              height={img.height}
              layout="intrinsic"
            />
          ) : null}
          <SlideMenu photo={photo} setShowInfo={setShowInfo} />
        </Flex>
      )}
    </>
  );
};

export default Slide;
