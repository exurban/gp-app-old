import Link from "next/link";
import { Flex, Card, Button, Icon, Heading, Text, Divider, Link as BBLink } from "bumbag";
import { PhotoInfoFragment } from "../graphql-operations";

// eslint-disable-next-line @typescript-eslint/ban-types
const SlideInfo: React.FC<{ photo: PhotoInfoFragment; setShowInfo: Function }> = ({
  photo,
  setShowInfo
}) => {
  return (
    <>
      <Flex direction="row" paddingX="20px">
        <Card maxWidth="600px" borderRadius="4" altitude="200">
          <Heading use="h4" marginBottom="major-2">
            {photo.title}
          </Heading>
          <Link href="/">
            <BBLink>
              <Heading use="h5" marginBottom="major-2">
                {photo.photographer.name}
              </Heading>
            </BBLink>
          </Link>

          <Text.Block>
            <Text marginBottom="major-2">{photo.location.name}</Text>
            <br />
            <Text fontSize="150">{photo.description}</Text>
          </Text.Block>
          <Divider marginY="major-2" />
          {photo.tagsForPhoto
            ? photo.tagsForPhoto.map(tagForPhoto => {
                <Link href="/">{tagForPhoto.tag.name}</Link>;
              })
            : null}
          {photo.subjectsInPhoto
            ? photo.subjectsInPhoto.map(subjectInPhoto => {
                <Link href="/">{subjectInPhoto.subject.name}</Link>;
              })
            : null}
        </Card>
        <div>
          <Button
            variant="ghost"
            // onClick={() => setShowInfo(false)}
            marginTop={{ default: "major-1", "max-Tablet": "minor-1" }}
            marginLeft="minor-1"
            onClick={() => setShowInfo(false)}
          >
            <Icon aria-label="options" icon="regular-times-circle" fontSize="200" />
          </Button>
        </div>
      </Flex>
    </>
  );
};

export default SlideInfo;
