import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  AllPhotosInCollectionDocument,
  AllPhotosInCollectionInput
} from "../../../graphql-operations";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";
import SectionGallery from "../../../components/SectionGallery";

const CollectionGallery: React.FC = () => {
  const router = useRouter();

  // * get tag from router
  const { name } = router.query;
  let searchString;
  if (name) {
    searchString = decodeURIComponent(name as string);
  }

  const input = { name: searchString } as AllPhotosInCollectionInput;

  const { loading, error, data } = useQuery(AllPhotosInCollectionDocument, {
    variables: { input: input }
  });

  if (error) return <ErrorMessage message={`Error loading photos with tag: ${name}.`} />;

  if (loading) return <Loader />;

  if (!data) return null;

  const { collectionInfo, total, photos } = data.allPhotosInCollection;

  return (
    <SectionGallery
      coverImage={collectionInfo.coverImage}
      name={collectionInfo.name}
      description={collectionInfo.description}
      total={total}
      photos={photos}
    />
  );
};

export default CollectionGallery;
