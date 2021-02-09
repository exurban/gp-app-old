import { useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../graphql-operations";
import { Flex, Text, Button, Paragraph } from "bumbag";
import Loader from "./Loader";
import Carousel from "./Carousel";

// const input: AllPhotosOfSubjectInput = {
//   name: "beast"
// };

type Props = {
  input: AllPhotosOfSubjectInput;
};

const Gallery: React.FC<Props> = ({ input }) => {
  const { loading, error, data } = useQuery(AllPhotosOfSubjectDocument, {
    variables: {
      input: input
    }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (!data) return null;

  const { subjectInfo, total, photos } = data.allPhotosOfSubject;

  return (
    <Flex alignItems="center">
      {photos.map(photo => (
        <img key={photo.id} src={photo.images?.[0].imageUrl} />
      ))}
    </Flex>
  );
};

export default Gallery;
