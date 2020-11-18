import { GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import { SubjectWithNameDocument, SubjectInput } from "../../graphql-operations";
import Gallery from "../../components/Gallery";

const subject = { name: "sky" } as SubjectInput;

const BirdGallery: React.FC = () => <Gallery subject={subject} />;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SubjectWithNameDocument,
    variables: { input: subject }
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
};

export default BirdGallery;
