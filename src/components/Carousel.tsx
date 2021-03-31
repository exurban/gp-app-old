import { Dispatch, SetStateAction } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// import { isMobile } from "react-device-detect";

type Props = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  items: CarouselItem[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};
const Carousel: React.FC<Props> = ({ items, activeIndex, setActiveIndex }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSlideChanged = ({ item }) => {
    setActiveIndex(item);
  };

  return (
    <AliceCarousel
      autoWidth
      disableButtonsControls
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
  );
};

export default Carousel;
