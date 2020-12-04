import { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { AllPhotosOfSubjectDocument } from "../../graphql-operations";
import Gallery from "../../components/Gallery";

const BeastGallery: React.FC = () => <Gallery />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: AllPhotosOfSubjectDocument,
    variables: {
      input: {
        subject: "beast",
        take: 5
      }
    }
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1
  });
};

export default BeastGallery;
