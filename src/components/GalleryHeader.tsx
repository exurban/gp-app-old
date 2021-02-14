import { Flex, Heading, Text, Image, styled } from "bumbag";
import { ImageInfoFragment } from "../graphql-operations";

type Props = {
  image: ImageInfoFragment | null | undefined;
  title: string;
  description: string | null | undefined;
};

const GalleryHeader: React.FC<Props> = ({ image, title, description }) => {
  const StyledImage = styled(Image)`
    width: 100px;
    height: 150px;
  `;

  return (
    <Flex flexDirection="row" justifyContent="space-between" width="100%">
      <Flex>
        {image?.imageUrl && <StyledImage src={image?.imageUrl} />}
        <Flex flexDirection="column" marginLeft="major-2" height="150px" justifyContent="center">
          <Heading use="h3" marginBottom="major-3">
            {title}
          </Heading>
          <Text.Block fontSize={{ default: "300", "max-tablet": "150" }}>{description}</Text.Block>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GalleryHeader;
