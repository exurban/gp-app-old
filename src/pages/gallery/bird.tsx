import { GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../../graphql-operations";
import Gallery from "../../components/Gallery";

const input = { subject: "bird", take: 20 } as AllPhotosOfSubjectInput;

const BirdGallery: React.FC = () => <Gallery input={input} />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: AllPhotosOfSubjectDocument,
    variables: { input: input }
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
};

export default BirdGallery;
