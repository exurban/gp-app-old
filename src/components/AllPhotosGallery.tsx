import { useQuery, NetworkStatus } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import { AllPhotosDocument, AllPhotosInput, PaginatedPhotoResponse } from "../graphql-operations";
import { Button, Flex, Paragraph, Text } from "bumbag";
import Loader from "./Loader";

const input: AllPhotosInput = { take: 10 };

const AllPhotosGallery: React.FC = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(AllPhotosDocument, {
    variables: {
      input: input
    }
  });

  const loadingMorePhotos = networkStatus === NetworkStatus.fetchMore;

  const loadMorePhotos = () => {
    fetchMore({
      variables: {
        input: input
      }
    });
  };

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading && !loadingMorePhotos) return <Loader />;

  console.log(`GALLERY`);
  if (data) {
    console.log(`data`, data);
  }

  if (data?.allPhotos?.photos) {
    console.log(`photos: ${data.allPhotos.photos}`);
  }
  const { photos, endCursor, total } = data?.allPhotos as PaginatedPhotoResponse;

  input.cursor = endCursor;

  // let areMorePhotos = false;

  // if (photos && total) {
  //   areMorePhotos = photos.length < total;
  // }

  return (
    <Flex flexDirection="column" margin="60px">
      {photos.map((photo, index) => (
        <Paragraph key={photo.sortIndex}>
          <Text>
            {index} {photo.sortIndex} {photo.title}
          </Text>
        </Paragraph>
      ))}

      {/* <Button width="200px" onClick={() => loadMorePhotos()} disabled={loadingMorePhotos}>
        fetch more
      </Button> */}
      <Button width="200px" onClick={() => loadMorePhotos()}>
        fetch more
      </Button>
    </Flex>
  );
};

export default AllPhotosGallery;
