import { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import {
  PaginatedPhotosOfSubjectDocument,
  PaginatedPhotosOfSubjectInput
} from "../../graphql-operations";
import PaginatedGallery from "../../components/PaginatedGallery";

const input = { name: "beast", take: 10 } as PaginatedPhotosOfSubjectInput;

const BeastGallery: React.FC = () => <PaginatedGallery input={input} />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PaginatedPhotosOfSubjectDocument,
    variables: { input: input }
  });

  return addApolloState(apolloClient, {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  });
};

export default BeastGallery;
