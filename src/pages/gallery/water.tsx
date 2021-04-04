import { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../../graphql-operations";
import Gallery from "../../components/Gallery";
import { NextSeo } from "next-seo";

const input = { name: "water" } as AllPhotosOfSubjectInput;

const WaterGallery: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Water Gallery"
        description="Water | Landscape photography streams, rivers, lakes and waterfalls"
        openGraph={{
          images: [
            {
              url:
                "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/1087_share-image-1616773099246.webp"
            }
          ]
        }}
      />
      <Gallery input={input} />
    </>
  );
};

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

export default WaterGallery;
