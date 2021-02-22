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
import {
  Flex,
  Tag,
  // applyTheme,
  Heading,
  Text,
  // Button,
  Divider,
  Link as BBLink,
  styled
} from "bumbag";
import { TwitterShareButton, TwitterIcon } from "react-share";

const Photo: React.FC = () => {
  const router = useRouter();

  const { sku } = router.query;
  console.log(`sku is ${sku}`);

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

  // const share = () => {
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         url: document.location.href,
  //         title: photo.title,
  //         text: photo.description
  //       })
  //       .then(() => console.log(`Share was successful.`))
  //       .catch(error => console.log(`Sharing failed:`, error));
  //   } else {
  //     console.log(`Your browser doesn't support file sharing.`);
  //   }
  // };

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

  const title = "A Dilly of a Pickle";
  const description = `title: ${photo.title} - ${photo.sku}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://www.gibbs-photography.com",
          site_name: "Gibbs Photography",
          title: `Image ${photo.sku}`,
          description: `Description for ${photo.sku}`,
          images: [
            {
              url: `${photo.images?.[0].imageUrl}`
            }
          ]
        }}
        twitter={{
          handle: "@gibbs_photog",
          site: "https://gibbs-photography.com",
          cardType: "summary_large_image"
        }}
      />

      <Flex width="100%" alignX="center" marginTop="major-4">
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
          <Text.Block fontSize="400" marginY="major-3">
            {photo.description}
          </Text.Block>
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { sku: "1042" } }, { params: { sku: "1115" } }, { params: { sku: "1116" } }],
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
