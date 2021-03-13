import { Dispatch, SetStateAction } from "react";
import { Card, Text, applyTheme } from "bumbag";
import { MatInfoFragment } from "../graphql-operations";

type Props = {
  mat: MatInfoFragment;
  selectedMat: MatInfoFragment | undefined;
  setSelectedMat: Dispatch<SetStateAction<MatInfoFragment | undefined>>;
};

const SelectMatCard: React.FC<Props> = ({ mat, selectedMat, setSelectedMat }) => {
  const OptionCard = applyTheme(Card, {
    styles: {
      base: {
        boxShadow: "none",
        border: "3px solid",
        borderColor: selectedMat?.displayName === mat.displayName ? "primary" : "rgba(0, 0, 0, 0)",
        transition: "border-color 0.25s ease",
        _hover: {
          border: "3px solid",
          borderColor: "primary"
        }
      }
    }
  });

  return (
    <OptionCard userSelect="none" onClick={() => setSelectedMat(mat)}>
      <img
        src={mat.coverImage?.imageUrl}
        alt={mat.coverImage?.altText}
        width={mat.coverImage ? mat.coverImage.width / 5 : 0}
        height={mat.coverImage ? mat.coverImage.height / 5 : 0}
        style={{ borderRadius: "4px" }}
      />
      <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
        {mat.displayName}
      </Text.Block>
    </OptionCard>
  );
};

export default SelectMatCard;
