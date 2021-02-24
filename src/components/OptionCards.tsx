import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Set, Flex, Text, Box } from "bumbag";
import OptionCard from "./OptionCard";

type SizeOption = {
  description: string;
  price: number;
  value: string;
};

type Props = {
  orientation?: "vertical" | "horizontal" | undefined;
  spacing?: string | undefined;
  width?: string | number | { [key: string]: string } | undefined;
  alignX?: "left" | "center" | "right" | undefined;
  setSelectedSize: Dispatch<SetStateAction<string | undefined>>;
  sizeOptions: SizeOption[];
};

const OptionCards: React.FC<Props> = ({
  orientation,
  spacing,
  width,
  alignX,
  setSelectedSize,
  sizeOptions
}) => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(undefined);

  const selectItemAtIndex = (idx: number) => {
    setSelectedOption(idx);
  };

  useEffect(() => {
    if (selectedOption) {
      console.log(`selected ${sizeOptions[selectedOption].value}`);
      setSelectedSize(sizeOptions[selectedOption].value);
    }
  }, [selectedOption]);

  return (
    <Box alignX={alignX}>
      <Box width={width}>
        <Set spacing={spacing} orientation={orientation} isFilled>
          {sizeOptions.map((size, idx) => (
            <OptionCard
              key={idx}
              value={size.value}
              index={idx}
              selectedOption={selectedOption}
              markSelected={selectItemAtIndex}
            >
              <Flex justifyContent="space-between">
                <Text.Block>{size.description}</Text.Block>
                <Text.Block>${size.price}</Text.Block>
              </Flex>
            </OptionCard>
          ))}
        </Set>
      </Box>
    </Box>
  );
};

export default OptionCards;

// const OptionCard = applyTheme(Card, {
//   styles: {
//     base: {
//       boxShadow: "none"
//     }
//   },
//   defaultProps: {
//     border: "3px solid",
//     borderColor: "rgba(0, 0, 0, 0)",
//     transition: "border-color 0.25s ease",
//     _hover: {
//       border: "3px solid",
//       borderColor: "primary"
//     }
//   }
// });
