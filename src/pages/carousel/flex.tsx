import { useEffect } from "react";
import { Flex, Box, Grid } from "bumbag";

const FlexTest = () => {
  const words = [
    "apple",
    "banana",
    "cranberry",
    "donut",
    "eggplant",
    "fig",
    "grape",
    "hyena",
    "ice cream",
    "juice"
  ];

  return (
    <Grid>
      <Flex
        className="carousel"
        id="carousel"
        flexWrap="nowrap"
        height="100vh"
        alignY="center"
        overflowX="scroll"
        overflowY="hidden"
        scrollSnapType="x mandatory"
        scrollBehavior="smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {words.map((word, idx) => (
          <Box
            key={idx}
            className="image-wrapper"
            id={`word${idx}`}
            background="#569ad6"
            height="20vh"
            width="100vw"
            margin="20px"
            position="relative"
            alignX="center"
            alignY="center"
            flex="1 0 auto"
            scrollSnapAlign="center"
          >
            <Box>
              {idx} {word}
            </Box>
          </Box>
        ))}
      </Flex>
    </Grid>
  );
};

export default FlexTest;
