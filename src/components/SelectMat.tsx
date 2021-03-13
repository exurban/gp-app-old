import { Dispatch, SetStateAction } from "react";
import { Divider, Heading, Text, Flex, Box } from "bumbag";
import { MatInfoFragment } from "../graphql-operations";
import SelectMatCard from "./SelectMatCard";

type Props = {
  mats: MatInfoFragment[] | undefined;
  selectedMat: MatInfoFragment | undefined;
  setSelectedMat: Dispatch<SetStateAction<MatInfoFragment | undefined>>;
};

const SelectMat: React.FC<Props> = ({ mats, selectedMat, setSelectedMat }) => {
  if (!mats || mats.length < 1) return null;

  mats.sort((a, b) => (a.displayName > b.displayName ? 1 : -1));

  return (
    <>
      <Divider marginY="major-3" />
      <Flex>
        <Heading use="h5" marginY="major-2">
          Add a mat.
        </Heading>
        <Text.Block alignSelf="center" marginLeft="major-2" color="info500" fontWeight="500">
          +${mats[0]?.retailPrice}
        </Text.Block>
        <Text.Block
          use="i"
          alignSelf="center"
          marginLeft="major-1"
          color="textTint"
          fontWeight="300"
        >
          (optional)
        </Text.Block>
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
        {mats?.map(mat => (
          <SelectMatCard
            key={mat.displayName}
            mat={mat}
            selectedMat={selectedMat}
            setSelectedMat={setSelectedMat}
          />
        ))}
      </Box>
    </>
  );
};

export default SelectMat;
