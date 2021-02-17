import Head from "next/head";
import { Box } from "bumbag";

const SingleImageLayout: React.FC<{ title?: string }> = ({ children, title }) => {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box
        className="single-image-page-wrapper"
        width="100vw"
        height="100vh"
        alignX="center"
        backgroundColor="#1b1c1a"
      >
        <Box
          className="carousel-wrapper"
          width="90vw"
          height="90vh"
          alignX="center"
          alignY="center"
          backgroundColor="#1b1c1a"
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default SingleImageLayout;
