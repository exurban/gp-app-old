import { GetStaticProps, GetStaticPaths } from "next";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { useRouter } from "next/router";
// import Head from "next/head";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import {
  PhotoInfoFragment,
  PhotoWithSkuDocument,
  ImageInfoFragment
} from "../../graphql-operations";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import Link from "next/link";
import { photoSkus } from "../../../build-data";
import {
  Flex,
  Tag,
  // applyTheme,
  Heading,
  Text,
  Button,
  Divider,
  Link as BBLink,
  styled
} from "bumbag";
import { TwitterShareButton, TwitterIcon } from "react-share";

const Photo: React.FC = () => {
  const router = useRouter();

  const { sku } = router.query;

  let skuInt = 0;
  if (sku && typeof sku === "string") {
    skuInt = parseInt(sku);
  }
  const { loading, error, data } = useQuery(PhotoWithSkuDocument, {
    variables: { sku: skuInt }
  });

  if (!data) {
    return null;
  }

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message="Error loading photo." />;

  const photo: PhotoInfoFragment = data.photoWithSku;
  const image: ImageInfoFragment = photo.images[0];

  const pgName = photo?.photographer?.name as string;
  const locationName = photo?.location?.name as string;
  const subjects = photo?.subjectsInPhoto?.map(x => x.subject);
  const tags = photo?.tagsForPhoto?.map(x => x.tag);
  const collections = photo?.collectionsForPhoto?.map(x => x.collection);

  const StyledImage = styled(Image)`
    border-radius: 4px;
  `;

  // const IconButton = applyTheme(Button, {
  //   styles: {
  //     base: {
  //       fontSize: "14px"
  //     }
  //   },
  //   defaultProps: {
  //     palette: "primary",
  //     variant: "ghost",
  //     size: "small",
  //     color: "#babbba",
  //     _hover: {
  //       backgroundColor: "#babbba",
  //       color: "#1b1c1a"
  //     },
  //     _focus: {
  //       boxShadow: "none"
  //     }
  //   }
  // });

  const title = `${photo.title}`;
  const description = `${photo.description}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: `https://gibbs-photography.com/image/${photo.sku}`,
          images: [
            {
              url: photo.images[0].imageUrl
            }
          ]
        }}
      />

      <Flex width="100%" alignX="center" marginY="major-4">
        <Flex width="90vw" maxWidth="720px" flexDirection="column">
          <StyledImage
            src={image.imageUrl}
            layout="intrinsic"
            width={image.width / 2}
            height={image.height / 2}
          />
          <Heading use="h2" textAlign="center" marginTop="major-4">
            {photo.title}
          </Heading>

          <Link href={`/gallery/photographer/${encodeURIComponent(pgName.toLowerCase())}`}>
            <BBLink>
              <Heading use="h5" marginBottom="major-2">
                {pgName}
              </Heading>
            </BBLink>
          </Link>

          <Text.Block marginBottom="major-3">
            <Link href={`/gallery/location/${encodeURIComponent(locationName.toLowerCase())}`}>
              <BBLink>
                <Text marginBottom="major-2" color="secondary">
                  {locationName}
                </Text>
              </BBLink>
            </Link>
          </Text.Block>
          <Text.Block fontSize="400" marginY="major-3">
            {photo.description}
          </Text.Block>
          <Flex flexDirection="row" width="100%" alignX="center" marginY="major-3">
            <Button iconBefore="regular-star" marginX="major-2">
              Add to Favorites
            </Button>
            <Button iconBefore="solid-shopping-bag" marginX="major-2">
              Add to Shopping Bag
            </Button>
          </Flex>

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
          <Flex alignItems="baseline">
            <Text.Block fontSize="200" fontVariant="small-caps">
              Related:
            </Text.Block>
            {subjects?.map(subject => (
              <Link
                key={subject.id}
                href={`/gallery/${encodeURIComponent(subject.name.toLowerCase())}`}
              >
                <BBLink>
                  <Tag palette="primary" marginLeft="major-1">
                    {subject.name}
                  </Tag>
                </BBLink>
              </Link>
            ))}
            {tags?.map(tag => (
              <Link
                key={tag.id}
                href={`/gallery/tag/${encodeURIComponent(tag.name.toLowerCase())}`}
              >
                <Tag palette="secondary" marginLeft="major-1">
                  {tag.name}
                </Tag>
              </Link>
            ))}
          </Flex>

          <Divider marginY="major-2" />
          <Flex alignItems="baseline">
            <Text.Block fontSize="200" fontVariant="small-caps">
              Share:
            </Text.Block>
            <TwitterShareButton
              url={`https://gibbs-photography.com/image/${photo.sku}`}
              title={photo.title}
              hashtags={["nature", "photography"]}
            >
              <TwitterIcon size={36} style={{ borderRadius: "50%" }} />
            </TwitterShareButton>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

// const skus = ["1041", "1042", "1043", "1044", "1045", "1046", "1047", "1048", "1049", "1050"];

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = photoSkus.map(sku => ({ params: { sku: sku } }));
  return {
    // paths: [{ params: { sku: "1042" } }, { params: { sku: "1115" } }, { params: { sku: "1116" } }],
    paths: paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.sku !== "string") {
    return;
  }
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PhotoWithSkuDocument,
    variables: { sku: parseInt(params.sku) }
  });

  return addApolloState(apolloClient, {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  });
};

export default Photo;
