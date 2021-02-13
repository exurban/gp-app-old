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
    <SectionGallery
      coverImage={photographerInfo.coverImage}
      name={photographerInfo.name}
      description={photographerInfo.bio}
      total={total}
      photos={photos}
    />
  );
};

export default PhotographerGallery;
