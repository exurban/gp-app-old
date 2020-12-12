import Link from "next/link";
import { Flex, Card, Button, Icon, Heading, Text, Divider, Tag, Link as BBLink } from "bumbag";
import { PhotoInfoFragment } from "../graphql-operations";

// eslint-disable-next-line @typescript-eslint/ban-types
const SlideInfo: React.FC<{ photo: PhotoInfoFragment; setShowInfo: Function }> = ({
  photo,
  setShowInfo
}) => {
  const photographer = photo.photographer;
  const name = photographer?.name as string;
  const locationName = photo?.location?.name as string;
  const collections = photo?.collectionsForPhoto?.map(x => x.collection);
  const subjects = photo?.subjectsInPhoto?.map(x => x.subject);
  const tags = photo?.tagsForPhoto?.map(x => x.tag);
  return (
    <>
      <Flex direction="row" width="100%" justifySelf="start" alignSelf="start">
        <Card borderRadius="4" altitude="200">
          <Heading use="h4" marginBottom="major-2">
            {photo.title}
          </Heading>
          <Link href={`/gallery/photographer/${encodeURIComponent(name.toLowerCase())}`}>
            <BBLink>
              <Heading use="h5" marginBottom="major-2">
                {name}
              </Heading>
            </BBLink>
          </Link>

          <Text.Block>
            <Link href={`/gallery/location/${encodeURIComponent(locationName.toLowerCase())}`}>
              <BBLink>
                <Text marginBottom="major-2" color="secondary">
                  {locationName}
                </Text>
              </BBLink>
            </Link>
            <br />
            <Text fontSize="150">{photo.description}</Text>
          </Text.Block>
          {collections !== undefined && collections.length > 0 ? (
            <>
              <Divider marginTop="major-2" />
              <Text fontVariant="small-caps" fontSize="100">
                Collections:
              </Text>
              {collections?.map(collection => (
                <Link href={`/gallery/collection/${encodeURIComponent(collection.name)}`}>
                  <BBLink key={collection.id}>
                    <p>{collection.name}</p>
                  </BBLink>
                </Link>
              ))}
            </>
          ) : null}

          <Divider marginY="major-2" />
          {subjects?.map(subject => (
            <Link href={`/gallery/${encodeURIComponent(subject.name)}`}>
              <BBLink key={subject.id}>
                <Tag palette="primary" marginLeft="minor-1">
                  {subject.name}
                </Tag>
              </BBLink>
            </Link>
          ))}
          {tags?.map(tag => (
            <Link href={`/gallery/tag/${encodeURIComponent(tag.name)}`}>
              <Tag palette="secondary" marginLeft="minor-1" key={tag.id}>
                {tag.name}
              </Tag>
            </Link>
          ))}
        </Card>
        <Button
          variant="ghost"
          alignSelf="start"
          alignX="right"
          alignY="top"
          marginX="major-1"
          marginTop="major-1"
          alignItems="center"
          justifyContent="center"
          onClick={() => setShowInfo(false)}
        >
          <Icon
            aria-label="options"
            icon="regular-times-circle"
            fontSize="200"
            alignX="center"
            alignY="center"
          />
        </Button>
      </Flex>
    </>
  );
};

export default SlideInfo;
