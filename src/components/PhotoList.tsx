import { useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import { AllPhotosQueryDocument } from "../../src/typed-document-nodes";

const PhotoList: React.FC = () => {
  const { loading, error, data } = useQuery(AllPhotosQueryDocument, {});

  if (error) return <ErrorMessage message="Error loading photos." />;
  if (loading) return <div>Loading</div>;

  if (data) {
    const photos = data.photos;

    return (
      <section>
        <h1>{photos.length}</h1>
        {photos.map(photo => (
          <div key={photo.id}>
            <p>
              {photo.title}: {photo.photographer.name}
            </p>
          </div>
        ))}
        {/* <pre>{JSON.stringify(photos, null, 2)}</pre> */}
      </section>
    );
  }
  return <div>Failed to fetch photos.</div>;
};

export default PhotoList;
