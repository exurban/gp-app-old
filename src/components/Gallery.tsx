import { useQuery, NetworkStatus } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import {
  AllPhotosOfSubjectDocument,
  AllPhotosOfSubjectInput,
  PaginatedPhotosOfSubjectResponse
} from "../graphql-operations";
import { Flex, Text, Button, Paragraph } from "bumbag";
import Loader from "./Loader";

const input: AllPhotosOfSubjectInput = {
  subject: "beast",
  take: 5
};

const Gallery: React.FC = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(AllPhotosOfSubjectDocument, {
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

  // console.log(`GALLERY`);
  // if (data) {
  //   console.log(`data`, data);
  // }

  // if (data?.allPhotosOfSubject?.photos) {
  //   console.log(`photos: ${data.allPhotosOfSubject.photos}`);
  // }

  const { photos, endCursor, total } = data?.allPhotosOfSubject as PaginatedPhotosOfSubjectResponse;

  input.cursor = endCursor;
  input.take = 10;
  // let areMorePhotos = false;

  // if (photos && total) {
  //   areMorePhotos = photos.length < total;
  // }

  return (
    <Flex flexDirection="column" margin="60px">
      {photos.map((photo, index) => (
        <Paragraph key={photo.sortIndex}>
          <Text>
            {index} {photo.title}
          </Text>
        </Paragraph>
      ))}

      <Button width="200px" onClick={() => loadMorePhotos()} disabled={loadingMorePhotos}>
        fetch more
      </Button>
    </Flex>
  );
};

export default Gallery;
