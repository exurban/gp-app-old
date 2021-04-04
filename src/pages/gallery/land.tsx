import { GetStaticProps } from "next";
import { initializeApollo, addApolloState } from "../../lib/apolloClient";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../../graphql-operations";
import Gallery from "../../components/Gallery";
import { NextSeo } from "next-seo";

const input = { name: "land" } as AllPhotosOfSubjectInput;

const LandGallery: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Land Gallery"
        description="Landscape Photography | State and National Parks of the United States"
        openGraph={{
          images: [
            {
              url:
                "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/1137_share-image-1616774911762.webp"
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

export default LandGallery;
