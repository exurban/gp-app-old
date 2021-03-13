import { Divider, Heading } from "bumbag";
import { Dispatch, SetStateAction } from "react";
import { PrintInfoFragment } from "../graphql-operations";
import PrintSizeCard from "./PrintSizeCard";

type imagePrice = {
  size: number;
  price: number;
};

type Props = {
  prints: PrintInfoFragment[] | undefined;
  imagePrices: imagePrice[] | undefined;
  selectedPrint: PrintInfoFragment | undefined;
  setSelectedPrint: Dispatch<SetStateAction<PrintInfoFragment | undefined>>;
};

const SelectPrintSize: React.FC<Props> = ({
  prints,
  imagePrices,
  selectedPrint,
  setSelectedPrint
}) => {
  return (
    <>
      <Divider marginY="major-2" />
      <Heading use="h5" marginY="major-3">
        Choose your size.
      </Heading>
      {prints?.map(print => (
        <PrintSizeCard
          key={print.dimension1}
          print={print}
          imagePrice={imagePrices?.find(p => p.size === print.dimension1)}
          size={print.dimension1}
          selectedPrint={selectedPrint}
          setSelectedPrint={setSelectedPrint}
        />
      ))}
    </>
  );
};

export default SelectPrintSize;
