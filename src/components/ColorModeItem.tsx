import { Flex, Icon, Text, useColorMode } from "bumbag";

type Props = {
  size: string;
};

const ColorModeItem: React.FC<Props> = ({ size }) => {
  const { colorMode, setColorMode } = useColorMode();

  if (colorMode === "default") {
    return (
      <Flex
        cursor="pointer"
        flexDirection="column"
        marginBottom={size === "large" ? "12px" : "0px"}
        height="100%"
        justifyContent={size === "small" ? "center" : "flex-end"}
        paddingX={size === "small" ? "major-1" : "0px"}
        onClick={() => setColorMode("dark")}
      >
        <Icon
          aria-label="dark mode"
          icon="solid-moon"
          margin="0 auto"
          fontSize="1.25rem"
          color="#dbe29c"
        />
        {size === "large" && (
          <Text marginTop="minor-1" fontSize="0.875rem" fontWeight="200" marginX="auto">
            Dark
          </Text>
        )}
      </Flex>
    );
  } else {
    return (
      <Flex
        cursor="pointer"
        flexDirection="column"
        marginBottom={size === "large" ? "12px" : "0px"}
        height="100%"
        justifyContent={size === "small" ? "center" : "flex-end"}
        paddingX={size === "small" ? "major-1" : "0px"}
        onClick={() => setColorMode("default")}
      >
        <Icon
          aria-label="light mode"
          icon="solid-sun"
          margin="0 auto"
          fontSize="1.25rem"
          color="#fee61e"
        />
        {size === "large" && (
          <Text marginTop="minor-1" fontSize="0.875rem" fontWeight="200" marginX="auto">
            Light
          </Text>
        )}
      </Flex>
    );
  }
};

export default ColorModeItem;
