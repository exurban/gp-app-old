import { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { AllFeaturedPhotosDocument } from "../../graphql-operations";
import FeaturedGallery from "../../components/FeaturedGallery";

const FeaturedPhotosGallery: React.FC = () => <FeaturedGallery />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: AllFeaturedPhotosDocument
  });

  return addApolloState(apolloClient, {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  });
};

export default FeaturedPhotosGallery;
