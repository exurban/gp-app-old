import { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { AllPhotosDocument } from "../../graphql-operations";
import AllPhotosGallery, { allPhotosQueryVars } from "../../components/AllPhotosGallery";

const BeastGallery: React.FC = () => <AllPhotosGallery />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: AllPhotosDocument,
    variables: { input: allPhotosQueryVars }
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1
  });
  // from 1st version
  // return {
  //   props: {
  //     initialApolloState: apolloClient.cache.extract()
  //   },
  //   revalidate: 1
  // };
};

export default BeastGallery;
