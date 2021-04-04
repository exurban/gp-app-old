import { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { AllFeaturedPhotosDocument } from "../../graphql-operations";
import FeaturedGallery from "../../components/FeaturedGallery";
import { NextSeo } from "next-seo";

const FeaturedPhotosGallery: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Featured Gallery"
        description="Nature and Landscape Photography"
        openGraph={{
          images: [
            {
              url:
                "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/1041-shared-image.webp"
            }
          ]
        }}
      />
      <FeaturedGallery />
    </>
  );
};

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
