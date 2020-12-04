import { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { AllPhotosDocument } from "../../graphql-operations";
import AllPhotosGallery from "../../components/AllPhotosGallery";

const PhotosGallery: React.FC = () => <AllPhotosGallery />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: AllPhotosDocument,
    variables: {
      input: {
        take: 5
      }
    }
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1
  });
};

export default PhotosGallery;
