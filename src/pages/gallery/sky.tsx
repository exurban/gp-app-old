import { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../../graphql-operations";
import Gallery from "../../components/Gallery";
import { NextSeo } from "next-seo";

const input = { name: "sky" } as AllPhotosOfSubjectInput;

const SkyGallery: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Sky Gallery"
        description="Sky Photography | Sunsets, sunrises and night photography"
        openGraph={{
          images: [
            {
              url:
                "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/1173_share-image-1616775944922.webp"
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

export default SkyGallery;
