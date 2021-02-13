import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AllPhotosAtLocationDocument, AllPhotosAtLocationInput } from "../../../graphql-operations";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";
import SectionGallery from "../../../components/SectionGallery";

const LocationGallery: React.FC = () => {
  const router = useRouter();

  // * get location's name from router
  const { name } = router.query;

  let searchString;
  if (name) {
    searchString = decodeURIComponent(name as string);
  }

  const input = { name: searchString } as AllPhotosAtLocationInput;

  console.log(`input: ${input}`);

  const { loading, error, data } = useQuery(AllPhotosAtLocationDocument, {
    variables: { input: input }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (!data) return null;

  const { locationInfo, total, photos } = data.allPhotosAtLocation;

  return (
    <SectionGallery
      coverImage={locationInfo.coverImage}
      name={locationInfo.name}
      description={locationInfo.description}
      total={total}
      photos={photos}
    />
  );
};

export default LocationGallery;
