import { Dispatch, SetStateAction } from "react";
import { Card, Flex, Text, applyTheme } from "bumbag";
import { PrintInfoFragment } from "../graphql-operations";

type imagePrice = {
  size: number;
  price: number;
};

type Props = {
  print: PrintInfoFragment;
  size: number;
  imagePrice: imagePrice | undefined;
  selectedPrint: PrintInfoFragment | undefined;
  setSelectedPrint: Dispatch<SetStateAction<PrintInfoFragment | undefined>>;
};

const PrintSizeCard: React.FC<Props> = ({
  print,
  size,
  imagePrice,
  selectedPrint,
  setSelectedPrint
}) => {
  const OptionCard = applyTheme(Card, {
    styles: {
      base: {
        boxShadow: "none",
        border: "3px solid",
        borderColor: selectedPrint?.dimension1 === size ? "primary" : "rgba(0, 0, 0, 0)",
        transition: "border-color 0.25s ease",
        _hover: {
          border: "3px solid",
          borderColor: "primary"
        }
      }
    }
  });

  let price = 0;
  if (imagePrice) {
    price = imagePrice.price + print.retailPrice;
  }

  return (
    <OptionCard
      width="60%"
      marginY="major-1"
      marginX="auto"
      userSelect="none"
      onClick={() => setSelectedPrint(print)}
    >
      <Flex justifyContent="space-between">
        <Text.Block>
          {print.dimension1}" x {print.dimension2}"
        </Text.Block>
        <Text.Block>${price}</Text.Block>
      </Flex>
    </OptionCard>
  );
};

export default PrintSizeCard;
