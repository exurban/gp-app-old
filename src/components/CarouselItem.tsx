import { PhotoInfoFragment } from "../graphql-operations";
import Image from "next/image";
import { Box, styled } from "bumbag";
import useWindowDimensions from "../utils/useWindowDimensions";
import { isMobile } from "react-device-detect";

const StyledImage = styled(Image)`
  border-radius: 20px;
`;

type Props = {
  photo: PhotoInfoFragment;
  idx: number;
};

const CarouselItem: React.FC<Props> = ({ photo, idx }) => {
  if (typeof window === "undefined") {
    return null;
  }
  const { height } = useWindowDimensions();

  return (
    <>
      <Box
        className="item"
        data-value={idx}
        key={idx}
        height={isMobile ? `${height}px` : `${height - 100}px`}
      >
        <StyledImage
          alt="demo"
          src={photo.images?.[0].imageUrl}
          layout="fill"
          objectFit="contain"
          quality={80}
        />
      </Box>
    </>
  );
};

export default CarouselItem;
