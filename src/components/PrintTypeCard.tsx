import { Dispatch, SetStateAction } from "react";
import { Card, Grid, Text, applyTheme } from "bumbag";

type Props = {
  type: string;
  displayName: string;
  lowestPrice: number;
  description: string;
  selectedPrintType: string | undefined;
  setSelectedPrintType: Dispatch<SetStateAction<string | undefined>>;
};

const PrintTypeCard: React.FC<Props> = ({
  type,
  displayName,
  lowestPrice,
  description,
  selectedPrintType,
  setSelectedPrintType
}) => {
  const OptionCard = applyTheme(Card, {
    styles: {
      base: {
        boxShadow: "none",
        border: "3px solid",
        borderColor: selectedPrintType === type ? "primary" : "rgba(0, 0, 0, 0)",
        transition: "border-color 0.25s ease",
        _hover: {
          border: "3px solid",
          borderColor: "primary"
        }
      }
    }
  });

  return (
    <OptionCard margin="major-1" userSelect="none" onClick={() => setSelectedPrintType(type)}>
      <Grid gridTemplateColumns="25% 70%" style={{ columnGap: "8px" }}>
        <Text.Block fontSize="250" fontWeight="700" gridArea="1/1/1/1" alignSelf="flex-end">
          {displayName}
        </Text.Block>
        <Text.Block fontSize="150" color="info500" gridArea="2/1/2/1" marginTop="major-2">
          from ${lowestPrice}
        </Text.Block>
        <Text.Block gridColumn="2" gridRow="1/span 2" alignSelf="center">
          {description}
        </Text.Block>
      </Grid>
    </OptionCard>
  );
};

export default PrintTypeCard;
