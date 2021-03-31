// import Head from "next/head";
import useWindowDimensions from "../utils/useWindowDimensions";

const SingleImageLayout: React.FC = ({ children }) => {
  if (typeof window === "undefined") {
    return null;
  }
  const { width, height } = useWindowDimensions();

  return (
    <>
      <div
        className="carousel-page"
        style={{
          width: width,
          height: height,
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
