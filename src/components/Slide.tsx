import { useState } from "react";
import Image from "next/image";
import { Flex } from "bumbag";
import SlideInfo from "./SlideInfo";
import SlideMenu from "./SlideMenu";
import { PhotoInfoFragment } from "../graphql-operations";

const Slide: React.FC<{ photo: PhotoInfoFragment }> = ({ photo }) => {
  const [showInfo, setShowInfo] = useState(false);

  let img;
  if (photo.images !== undefined && photo.images !== null) {
    img = photo.images[0];
  }

  return (
    <>
      {showInfo ? (
        <SlideInfo photo={photo} setShowInfo={setShowInfo} />
      ) : (
        <Flex className="image+button" direction="row" justifySelf="start" alignSelf="start">
          {img ? (
            <Image
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
