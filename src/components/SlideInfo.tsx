import Link from "next/link";
import {
  Flex,
  Card,
  Button,
  Icon,
  Heading,
  Text,
  Divider,
  Tag,
  useBreakpointValue,
  Link as BBLink
} from "bumbag";
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

  const size = useBreakpointValue({
    default: "default",
    "max-tablet": "small"
  });

  const spacing = useBreakpointValue({
    default: "major-1",
    "max-tablet": "minor-1"
  });

  return (
    <>
      <Flex direction="row" width="100%" justifySelf="start" alignSelf="start">
        <Card borderRadius="4" altitude="200" width="100%">
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
          {collections && collections.length > 0 ? (
            <>
              <Divider marginTop="major-2" />
              <Text fontVariant="small-caps" fontSize="100">
                Collections:
              </Text>
              {collections?.map(collection => (
                <Link
                  key={collection.id}
                  href={`/gallery/collection/${encodeURIComponent(collection.name.toLowerCase())}`}
                >
                  <BBLink>
                    <p>{collection.name}</p>
                  </BBLink>
                </Link>
              ))}
            </>
          ) : null}

          <Divider marginY="major-2" />
          {subjects?.map(subject => (
            <Link
              key={subject.id}
              href={`/gallery/${encodeURIComponent(subject.name.toLowerCase())}`}
            >
              <BBLink>
                <Tag palette="primary" marginLeft="minor-1">
                  {subject.name}
                </Tag>
              </BBLink>
            </Link>
          ))}
          {tags?.map(tag => (
            <Link key={tag.id} href={`/gallery/tag/${encodeURIComponent(tag.name.toLowerCase())}`}>
              <Tag palette="secondary" marginLeft="minor-1">
                {tag.name}
              </Tag>
            </Link>
          ))}
          <Text.Block fontSize="100" textAlign="right" width="100%">
            {photo.sku}
          </Text.Block>
        </Card>
        <Button
          alignSelf="start"
          variant="ghost"
          fontSize={{ default: "500", "max-tablet": "200" }}
          size={size}
          margin={spacing}
          padding={spacing}
          border="none"
          onClick={() => setShowInfo(false)}
        >
          <Icon aria-label="options" icon="regular-times-circle" fontSize="200" />
        </Button>
      </Flex>
    </>
  );
};

export default SlideInfo;
