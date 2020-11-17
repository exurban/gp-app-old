import { useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
// import allPhotosQuery from "../graphql/photos.graphql";
import { FeaturedPhotosQueryDocument } from "../../src/typed-document-nodes";

const FeaturedPhotoList: React.FC = () => {
  const { loading, error, data } = useQuery(FeaturedPhotosQueryDocument, {});

  if (error) return <ErrorMessage message="Error loading photos." />;
  if (loading) return <div>Loading</div>;

  if (data) {
    const photos = data.featuredPhotos;

    return (
      <section>
        <h1>{photos.length}</h1>
        {photos.map(photo => (
          <div key={photo.id}>
            <p>{photo.title}</p>
          </div>
        ))}
        {/* <pre>{JSON.stringify(photos, null, 2)}</pre> */}
      </section>
    );
  }
  return <div>Failed to fetch photos.</div>;
};

export default FeaturedPhotoList;
