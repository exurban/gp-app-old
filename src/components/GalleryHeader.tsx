import { Flex, Heading, Text } from "bumbag";
import { ImageInfoFragment } from "../graphql-operations";

type Props = {
  image: ImageInfoFragment | null | undefined;
  title: string;
  description: string | null | undefined;
};

const GalleryHeader: React.FC<Props> = ({ image, title, description }) => {
  return (
    <Flex flexDirection="row" justifyContent="space-between" width="100%">
      <Flex>
        <img src={image?.imageUrl} width="100" height="150" />
        <Flex flexDirection="column" marginLeft="major-2" height="150px" justifyContent="center">
          <Heading use="h3" marginBottom="major-3">
            {title}
          </Heading>
          <Text.Block fontSize="300">{description}</Text.Block>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GalleryHeader;
