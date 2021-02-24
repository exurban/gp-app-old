import { Card, applyTheme } from "bumbag";

type Props = {
  value: string;
  index: number;
  selectedOption?: number | undefined;
  markSelected: (arg0: number) => void;
};

const OptionCard: React.FC<Props> = ({ value, index, selectedOption, markSelected, children }) => {
  console.log({ value });
  const StyledCard = applyTheme(Card, {
    styles: {
      base: {
        boxShadow: "none",
        altitude: 400,
        _disabled: {
          color: "red"
        }
      }
    },
    defaultProps: {
      border: "3px solid",
      borderColor: index === selectedOption ? "primary400" : "rgba(0, 0, 0, 0)",
      transition: "border-color 0.25s ease",
      _hover: {
        border: "3px solid",
        borderColor: "primary300"
      }
    }
  });

  return (
    <StyledCard disabled={false} onClick={() => markSelected(index)} userSelect="none">
      {children}
    </StyledCard>
  );
};

export default OptionCard;
