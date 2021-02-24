import { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../../graphql-operations";
import Gallery from "../../components/Gallery";
import { NextSeo } from "next-seo";

const input = { name: "bird" } as AllPhotosOfSubjectInput;

// const BirdGallery: React.FC = () => <Gallery input={input} />;
const BirdGallery: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Bird page title"
        description="Bird page description"
        openGraph={{
          images: [
            {
              url:
                "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1047-1612554843501.webp"
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

export default BirdGallery;
