import { Dispatch, SetStateAction } from "react";
import { Divider, Heading, Text, Flex, Box } from "bumbag";
import { FrameInfoFragment } from "../graphql-operations";
import SelectFrameCard from "./SelectFrameCard";

type Props = {
  frames: FrameInfoFragment[] | undefined;
  selectedFrame: FrameInfoFragment | undefined;
  setSelectedFrame: Dispatch<SetStateAction<FrameInfoFragment | undefined>>;
};

const SelectFrame: React.FC<Props> = ({ frames, selectedFrame, setSelectedFrame }) => {
  if (!frames) return null;

  frames.sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1));

  return (
    <>
      <Divider marginY="major-3" />
      {frames.length < 1 ? (
        <Heading use="h5" marginY="major-2">
          No matting or framing options available for prints this size.
        </Heading>
      ) : (
        <>
          <Flex>
            <Heading use="h5" marginY="major-2">
              Add a frame.
            </Heading>
            <Text.Block alignSelf="center" marginLeft="major-2" color="info500" fontWeight="500">
              +${frames[0]?.retailPrice}
            </Text.Block>
            {frames[0].printType === "paper" ? (
              <Text.Block
                use="i"
                alignSelf="center"
                marginLeft="major-1"
                color="textTint"
                fontWeight="300"
              >
                (optional, price includes acrylic sheet to protect image)
              </Text.Block>
            ) : (
              <Text.Block
                use="i"
                alignSelf="center"
                marginLeft="major-1"
                color="textTint"
                fontWeight="300"
              >
                (optional)
              </Text.Block>
            )}
          </Flex>
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            rowGap="2rem"
            columnGap="1rem"
            justifyItems="center"
            alignItems="start"
            justifyContent="space-evenly"
          >
            {frames.map(frame => (
              <SelectFrameCard
                key={frame.displayName}
                frame={frame}
                selectedFrame={selectedFrame}
                setSelectedFrame={setSelectedFrame}
              />
            ))}
          </Box>
        </>
      )}
    </>
  );
};

export default SelectFrame;
