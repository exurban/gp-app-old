import { Dispatch, SetStateAction, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { isMobile } from "react-device-detect";
import { Button } from "bumbag";

type Props = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  items: CarouselItem[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};
const Carousel: React.FC<Props> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSlideChanged = ({ item }) => {
    setActiveIndex(item);
  };

  return (
    <>
      <AliceCarousel
        autoWidth
        disableButtonsControls={isMobile}
        disableDotsControls
        infinite
        animationType="fadeout"
        animationDuration={800}
        animationEasingFunction="ease-in-out"
        mouseTracking
        items={items}
        activeIndex={activeIndex}
        onSlideChanged={onSlideChanged}
      />
      <Button onClick={slidePrev}>Prev</Button>
      <Button onClick={slideNext}>Next</Button>
    </>
  );
};

export default Carousel;
