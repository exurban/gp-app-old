import Head from "next/head";

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

      <div
        className="carousel-page"
        style={{
          width: "100vw",
          height: "100vh",

          margin: "0",
          backgroundColor: "#1b1c1a",
          overflowY: "hidden",
          overscrollBehaviorY: "none"
        }}
      >
        {children}
      </div>
    </>
  );
};

export default SingleImageLayout;
