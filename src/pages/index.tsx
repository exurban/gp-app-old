import { GetStaticProps } from "next";
import PhotoList from "../components/PhotoList";
import { AllPhotosQueryDocument } from "../../src/typed-document-nodes";
import { initializeApollo } from "../lib/apolloClient";

const IndexPage: React.FC = () => <PhotoList />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: AllPhotosQueryDocument
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
};

export default IndexPage;
