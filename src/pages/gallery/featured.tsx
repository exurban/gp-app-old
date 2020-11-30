import { GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import { AllFeaturedPhotosDocument, AllFeaturedPhotosInput } from "../../graphql-operations";
import FeaturedPhotosGallery from "../../components/FeaturedPhotosGallery";

const input = { take: 10 } as AllFeaturedPhotosInput;
const FeaturedGallery: React.FC = () => <FeaturedPhotosGallery input={input} />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: AllFeaturedPhotosDocument,
    variables: { input: input }
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
};

export default FeaturedGallery;
