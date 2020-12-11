import { GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import {
  GroupedPhotosOfSubjectDocument,
  GroupedPhotosOfSubjectInput
} from "../../graphql-operations";
import Gallery from "../../components/Gallery";

const input = { name: "beast" } as GroupedPhotosOfSubjectInput;
const BeastGallery: React.FC = () => <Gallery input={input} />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GroupedPhotosOfSubjectDocument,
    variables: { input: input }
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
};

export default BeastGallery;
