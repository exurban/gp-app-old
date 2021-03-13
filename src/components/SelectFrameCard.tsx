import { Dispatch, SetStateAction } from "react";
import { Card, Text, applyTheme } from "bumbag";
import { FrameInfoFragment } from "../graphql-operations";

type Props = {
  frame: FrameInfoFragment;
  selectedFrame: FrameInfoFragment | undefined;
  setSelectedFrame: Dispatch<SetStateAction<FrameInfoFragment | undefined>>;
};

const SelectFrameCard: React.FC<Props> = ({ frame, selectedFrame, setSelectedFrame }) => {
  const OptionCard = applyTheme(Card, {
    styles: {
      base: {
        boxShadow: "none",
        border: "3px solid",
        borderColor:
          selectedFrame?.displayName === frame.displayName ? "primary" : "rgba(0, 0, 0, 0)",
        transition: "border-color 0.25s ease",
        _hover: {
          border: "3px solid",
          borderColor: "primary"
        }
      }
    }
  });

  return (
    <OptionCard userSelect="none" onClick={() => setSelectedFrame(frame)}>
      <img
        src={frame.coverImage?.imageUrl}
        alt={frame.coverImage?.altText}
        width="150px"
        height="135px"
        style={{ borderRadius: "4px" }}
      />
      <Text.Block fontSize="150" textAlign="center" marginTop="major-1">
        {frame.displayName}
      </Text.Block>
    </OptionCard>
  );
};

export default SelectFrameCard;
