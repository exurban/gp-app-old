import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AllPhotosWithTagDocument, AllPhotosWithTagInput } from "../../../graphql-operations";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";
import SectionGallery from "../../../components/SectionGallery";

const TagGallery: React.FC = () => {
  const router = useRouter();

  // * get tag from router
  const { name } = router.query;
  let searchString;
  if (name) {
    searchString = decodeURIComponent(name as string);
  }

  const input = { name: searchString } as AllPhotosWithTagInput;

  const { loading, error, data } = useQuery(AllPhotosWithTagDocument, {
    variables: { input: input }
  });

  if (error) return <ErrorMessage message={`Error loading photos with tag: ${name}.`} />;

  if (loading) return <Loader />;

  if (!data) return null;

  const { tagInfo, total, photos } = data.allPhotosWithTag;

  return (
    <SectionGallery
      coverImage={tagInfo.coverImage}
      name={tagInfo.name}
      description={tagInfo.description}
      total={total}
      photos={photos}
    />
  );
};

export default TagGallery;
