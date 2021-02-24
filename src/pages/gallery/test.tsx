import { Rover, Text, Flex, applyTheme, Button } from "bumbag";

const Test: React.FC = () => {
  const rover = Rover.useState();
  const roverCtx = Rover.useContext();

  const StyledButton = applyTheme(Button, {
    styles: {
      base: {
        boxShadow: "none"
      }
    },
    defaultProps: {
      width: "400px",
      margin: "major-2",
      border: "3px solid",
      // borderColor: tabindex === 0 ? "primary" : "rgba(0, 0, 0, 0)",
      borderColor: "rgba(0, 0, 0, 0.1)",
      transition: "border-color 0.25s ease",
      _hover: {
        border: "3px solid",
        borderColor: "primary"
      },
      _disabled: {
        color: "red"
      }
    }
  });

  console.log({ roverCtx });
  console.log(rover.currentId);

  return (
    <>
      <Flex flexDirection="column">
        <Rover {...rover} use={StyledButton} id="a" stopId="aa">
          <Flex
            width="100%"
            justifyContent="space-between"
            height="24px"
            alignY="center"
            padding="major-2"
          >
            <Text.Block>12" x 18"</Text.Block>
            <Text.Block>$375</Text.Block>
          </Flex>
        </Rover>
        <Rover {...rover} use={StyledButton} id="b">
          <Flex width="100%" justifyContent="space-between" height="24px" alignY="center">
            <Text.Block>16" x 24"</Text.Block>
            <Text.Block>$575</Text.Block>
          </Flex>
        </Rover>
        <Rover {...rover} use={StyledButton} id="c">
          <Flex width="100%" justifyContent="space-between" height="24px" alignY="center">
            <Text.Block>20" x 30"</Text.Block>
            <Text.Block>$875</Text.Block>
          </Flex>
        </Rover>
        <Rover {...rover} use={StyledButton} id="d">
          <Flex width="100%" justifyContent="space-between" height="24px" alignY="center">
            <Text.Block>30" x 45"</Text.Block>
            <Text.Block>$1200</Text.Block>
          </Flex>
        </Rover>
      </Flex>
    </>
  );
};

export default Test;
