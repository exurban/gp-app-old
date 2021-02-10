import { PhotoInfoFragment } from "../graphql-operations";
import Image from "next/image";
import { Box, styled } from "bumbag";

const StyledImage = styled(Image)`
  border-radius: 20px;
`;

type Props = {
  photo: PhotoInfoFragment;
  idx: number;
};

const CarouselItem: React.FC<Props> = ({ photo, idx }) => {
  return (
    <Box className="item" data-value={idx} key={idx} height="100vh" alignX="center" alignY="center">
      <StyledImage
        alt="demo"
        src={photo.images?.[0].imageUrl}
        layout="fill"
        objectFit="contain"
        quality={80}
      />
    </Box>
  );
};

export default CarouselItem;
