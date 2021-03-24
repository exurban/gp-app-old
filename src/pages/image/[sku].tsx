import { useMemo } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useQuery, useMutation } from "@apollo/client";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import Image from "next/image";
import {
  PhotoInfoFragment,
  PhotoWithSkuDocument,
  FavoritesDocument,
  AddPhotoToFavoritesDocument,
  ShoppingBagItemsDocument
} from "../../graphql-operations";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import Link from "next/link";
import { photoSkus } from "../../../build-data";
import {
  Flex,
  Tag,
  Heading,
  Text,
  Button,
  Divider,
  Link as BBLink,
  styled,
  useToasts
} from "bumbag";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";

const Photo: React.FC = () => {
  const [session] = useSession();
  const router = useRouter();
  const toasts = useToasts();
  const [addToFavorites] = useMutation(AddPhotoToFavoritesDocument);

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
  const image = photo.images[0];
  const sharingImage = photo.sharingImage || image;

  const pgName = photo?.photographer?.name as string;
  const locationName = photo?.location?.name as string;
  const subjects = photo?.subjectsInPhoto?.map(x => x.subject);
  const tags = photo?.tagsForPhoto?.map(x => x.tag);
  const collections = photo?.collectionsForPhoto?.map(x => x.collection);

  const StyledImage = styled(Image)`
    border-radius: 4px;
  `;

  const signinFirst = () => {
    localStorage.setItem("redirectUrl", router.pathname);
    localStorage.setItem("favPhoto", photo.id);
    router.push("/auth/signin");
  };

  const addPhotoToFavorites = () => {
    if (!session) {
      signinFirst();
      return;
    }

    let success;
    let msg;

    addToFavorites({
      variables: { photoId: parseInt(photo.id) },
      optimisticResponse: {
        __typename: "Mutation",
        addPhotoToFavorites: {
          success: true,
          message: `Added ${photo.title} to your favorites.`,
          addedPhotoWithId: photo.id,
          __typename: "AddPhotoToFavoritesResponse"
        }
      },
      update: (cache, { data: { ...newPhotoResponse } }) => {
        const { ...existing } = cache.readQuery({
          query: FavoritesDocument
        });

        const response = newPhotoResponse.addPhotoToFavorites;
        success = response.success;
        msg = response.message;

        const existingPhotos = existing.favorites?.photoList || [];

        cache.writeQuery({
          query: FavoritesDocument,
          data: {
            favorites: {
              __typename: "FavoritesResponse",
              photoList: photo ? [photo, ...existingPhotos] : [...existingPhotos]
            }
          }
        });
      }
    });
    {
      success
        ? toasts.success({
            title: "Added",
            message: msg
          })
        : toasts.warning({
            title: "Failed to add.",
            message: msg
          });
    }
  };

  const { data: favs } = useQuery(FavoritesDocument);
  const inFavorites = useMemo(() => {
    const favIds = favs?.favorites?.photoList?.map(f => f.id);
    return favIds ? favIds.includes(photo.id) : false;
  }, [favs]);

  const { data: bagItems } = useQuery(ShoppingBagItemsDocument);
  const inShoppingBag = useMemo(() => {
    const bagItemIds = bagItems?.shoppingBagItems?.dataList?.map(b => b.photo.id);
    return bagItemIds ? bagItemIds.includes(photo.id) : false;
  }, [bagItems]);

  const title = `${photo.title}`;
  const description = `${photo.description}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title: title,
          description: description,
          images: [
            {
              url: sharingImage.imageUrl || image.imageUrl,
              width: image.width,
              height: image.height,
              alt: image.altText
            }
          ]
        }}
      />

      <Flex width="100%" alignX="center" marginY="major-4">
        <Flex width="90vw" maxWidth="720px" flexDirection="column">
          <StyledImage
            className="image-wrapper"
            src={image.imageUrl}
            layout="responsive"
            width={image.width}
            height={image.height}
            sizes="(max-width: 400px) 100vw, 720px"
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
            {inFavorites ? (
              <Button
                iconBefore="regular-star"
                marginX="major-2"
                onClick={() => router.push(`/user/favorites`)}
              >
                View in Favorites
              </Button>
            ) : (
              <Button
                iconBefore="regular-star"
                marginX="major-2"
                onClick={() => addPhotoToFavorites()}
              >
                Add to Favorites
              </Button>
            )}
            {inShoppingBag ? (
              <Button
                iconBefore="solid-shopping-bag"
                marginX="major-2"
                onClick={() => router.push(`/shop/options/${photo.sku}`)}
              >
                View in Shopping Bag
              </Button>
            ) : (
              <Button
                iconBefore="solid-shopping-bag"
                marginX="major-2"
                onClick={() => router.push(`/shop/options/${photo.sku}`)}
              >
                Add to Shopping Bag
              </Button>
            )}
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
          <Flex alignItems="center">
            <Text.Block fontSize="200" fontVariant="small-caps">
              Share:
            </Text.Block>
            <TwitterShareButton
              url={`https://gibbs-photography.com/image/${photo.sku}`}
              title={photo.title}
              hashtags={["nature", "photography"]}
              style={{ marginLeft: "16px" }}
            >
              <TwitterIcon size={36} style={{ borderRadius: "50%" }} />
            </TwitterShareButton>
            <FacebookShareButton
              url={`https://gibbs-photography.com/image/${photo.sku}`}
              title={photo.title}
              hashtag={"photography"}
              style={{ marginLeft: "8px" }}
            >
              <FacebookIcon size={36} style={{ borderRadius: "50%" }} />
            </FacebookShareButton>
            <EmailShareButton
              url={`https://gibbs-photography.com/image/${photo.sku}`}
              subject="Gibbs Photography"
              body={`${photo.title}\n${photo.description}`}
              separator="\n"
              style={{ marginLeft: "8px" }}
            >
              <EmailIcon size={36} style={{ borderRadius: "50%" }} />
            </EmailShareButton>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = photoSkus.map(sku => ({ params: { sku: sku } }));
  return {
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
