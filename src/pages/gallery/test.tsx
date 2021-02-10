import { Box, Card, Text, Grid } from "bumbag";

const Test: React.FC = () => {
  return (
    <>
      <Box width="600px" height="100px" marginY="major-2" marginX="auto" altitude="200">
        <Text>Some stuff here.</Text>
      </Box>
      <Card>
        <Text>Some more stuff here.</Text>
      </Card>
      <Grid
        templateColumns="repeat(auto-fit, minmax(min(375px, 100%), max(700px)))"
        rowGap="5rem"
        columnGap="1rem"
        justifyContent="space-evenly"
        justifyItems="center"
        padding={{ default: "major-4", "max-tablet": "minor-1" }}
      >
        <Card altitude="200" alignX="center" alignY="center">
          <Text>Card 1</Text>
        </Card>
        <Card altitude="200" alignX="center" alignY="center">
          <Text>Card 2</Text>
        </Card>
        <Card altitude="200" alignX="center" alignY="center">
          <Text>Card 3</Text>
        </Card>
        <Card altitude="200" alignX="center" alignY="center">
          <Text>Card 4</Text>
        </Card>
        <Card altitude="200" alignX="center" alignY="center">
          <Text>Card 5</Text>
        </Card>
      </Grid>
    </>
  );
};

export default Test;
