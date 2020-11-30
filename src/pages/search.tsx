import { Flex, Box, Input } from "bumbag";

const Search: React.FC = () => {
  return (
    <Flex alignX="center">
      <Box width="90%" maxWidth="560px" height="200px" marginY="60px">
        <Input placeholder="Search..." />
      </Box>
    </Flex>
  );
};

export default Search;
