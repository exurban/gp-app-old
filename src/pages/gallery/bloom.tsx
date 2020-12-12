import { GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
<<<<<<< Updated upstream
import { AllPhotosOfSubjectDocument } from "../../graphql-operations";
import Gallery from "../../components/Gallery";

const BloomGallery: React.FC = () => <Gallery />;
=======
import {
  PaginatedPhotosOfSubjectDocument,
  PaginatedPhotosOfSubjectInput
} from "../../graphql-operations";
import PaginatedGallery from "../../components/PaginatedGallery";

const input = { name: "bloom", take: 10 } as PaginatedPhotosOfSubjectInput;

const BloomGallery: React.FC = () => <PaginatedGallery input={input} />;
>>>>>>> Stashed changes

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
<<<<<<< Updated upstream
    query: AllPhotosOfSubjectDocument,
    variables: {
      input: {
        subject: "bloom",
        take: 10
      }
    }
=======
    query: PaginatedPhotosOfSubjectDocument,
    variables: { input: input }
>>>>>>> Stashed changes
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
};

export default BloomGallery;
