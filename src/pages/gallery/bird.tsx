import { GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import { AllPhotosOfSubjectDocument } from "../../graphql-operations";
import Gallery from "../../components/Gallery";

const BirdGallery: React.FC = () => <Gallery />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: AllPhotosOfSubjectDocument,
    variables: {
      input: {
        subject: "bird",
        take: 10
      }
    }
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
};

export default BirdGallery;
