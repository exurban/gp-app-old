import { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../../graphql-operations";
import Gallery from "../../components/Gallery";

const input = { name: "bloom" } as AllPhotosOfSubjectInput;

const BloomGallery: React.FC = () => <Gallery input={input} />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: AllPhotosOfSubjectDocument,
    variables: { input: input }
  });

  return addApolloState(apolloClient, {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  });
};

export default BloomGallery;
