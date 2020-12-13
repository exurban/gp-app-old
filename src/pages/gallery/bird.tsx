import { GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import {
  PaginatedPhotosOfSubjectDocument,
  PaginatedPhotosOfSubjectInput
} from "../../graphql-operations";
import PaginatedGallery from "../../components/PaginatedGallery";

const input = { name: "bird", take: 10 } as PaginatedPhotosOfSubjectInput;

const BirdGallery: React.FC = () => <PaginatedGallery input={input} />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PaginatedPhotosOfSubjectDocument,
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
