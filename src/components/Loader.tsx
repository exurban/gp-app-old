import GridLoader from "react-spinners/GridLoader";
import { Flex } from "bumbag";

const Loader: React.FC = () => {
  return (
    <Flex height="calc(100vh / 2)" alignX="center" alignY="center">
      <GridLoader size={75} color="#eef" loading={true} />
    </Flex>
  );
};

export default Loader;
