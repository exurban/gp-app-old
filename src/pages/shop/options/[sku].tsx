import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { PhotoWithSkuDocument } from "../../../graphql-operations";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";

const LocationGallery: React.FC = () => {
  const router = useRouter();

  // * get location's name from router
  const { sku } = router.query;
  if (!sku || typeof sku !== "string") {
    return null;
  }

  const skuInt = parseInt(sku);

  const { loading, error, data } = useQuery(PhotoWithSkuDocument, {
    variables: { sku: skuInt }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (!data) return null;

  const photo = data.photoWithSku;

  return <pre>{JSON.stringify(photo, null, 2)}</pre>;
};

export default LocationGallery;
