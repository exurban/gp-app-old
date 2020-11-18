import { GetStaticProps } from "next";
import FeaturedPhotoList from "../../components/FeaturedPhotoList";
import { FeaturedPhotosQueryDocument } from "../../graphql-operations";
import { initializeApollo } from "../../lib/apolloClient";

const IndexPage: React.FC = () => <FeaturedPhotoList />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: FeaturedPhotosQueryDocument
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
};

export default IndexPage;
