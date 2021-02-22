import { GetStaticProps, GetStaticPaths } from "next";
import { addApolloState, initializeApollo } from "../../../lib/apolloClient";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  AllPhotosByPhotographerDocument,
  AllPhotosByPhotographerInput
} from "../../../graphql-operations";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";
import React from "react";
import SectionGallery from "../../../components/SectionGallery";
import { NextSeo } from "next-seo";

const PhotographerGallery: React.FC = () => {
  const router = useRouter();

  // * get tag from router
  const { name } = router.query;
  let searchString;
  if (name) {
    searchString = decodeURIComponent(name as string);
  }

  const input = { name: searchString } as AllPhotosByPhotographerInput;

  const { loading, error, data } = useQuery(AllPhotosByPhotographerDocument, {
    variables: { input: input }
  });

  if (error) return <ErrorMessage message={`Error loading photos taken by: ${name}.`} />;

  if (loading) return <Loader />;

  if (!data) return null;

  const { photographerInfo, total, photos } = data.allPhotosByPhotographer;

  return (
    <>
      <NextSeo
        title="Photographer Gallery"
        description="Description for photographer's gallery."
        openGraph={{
          images: [
            {
              url:
                "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1119-1612566116438.webp"
            }
          ]
        }}
      />
      <SectionGallery
        coverImage={photographerInfo.coverImage}
        name={photographerInfo.name}
        description={photographerInfo.bio}
        total={total}
        photos={photos}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { name: "Boyd" } }, { params: { name: "Scott" } }],
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.name !== "string") {
    return;
  }
  const input = { name: params.name } as AllPhotosByPhotographerInput;
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: AllPhotosByPhotographerDocument,
    variables: { input: input }
  });

  return addApolloState(apolloClient, {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  });
};

export default PhotographerGallery;
