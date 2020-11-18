import { useState } from "react";
import Image from "next/image";
import { Flex } from "bumbag";
import SlideInfo from "./SlideInfo";
import SlideMenu from "./SlideMenu";
import { PhotoInfoFragment } from "../graphql-operations";

const Slide: React.FC<{ photo: PhotoInfoFragment }> = ({ photo }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      {showInfo ? (
        <SlideInfo photo={photo} setShowInfo={setShowInfo} />
      ) : (
        <Flex className="image+button" direction="row" marginRight="20px">
          {/* <Box className="image" altitude="300" clipPath="inset(100% round 10px)"> */}
          <div>
            <Image
              src={photo.images[0].imageUrl}
              alt={photo.images[0].altText}
              width={photo.images[0].width}
              height={photo.images[0].height}
            />
          </div>

          <SlideMenu photo={photo} setShowInfo={setShowInfo} />
        </Flex>
      )}
    </>
  );
};

export default Slide;
