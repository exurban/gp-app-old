import { useImperativeHandle, forwardRef, Dispatch, SetStateAction } from "react";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

type Props = {
  items: Element[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Carousel: React.FC<Props> = forwardRef(({ items, activeIndex, setActiveIndex }, ref) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSlideChanged = ({ item }) => setActiveIndex(item);

  useImperativeHandle(ref, () => ({
    prevSlide() {
      setActiveIndex(activeIndex - 1);
    },
    nextSlide() {
      setActiveIndex(activeIndex + 1);
    },
    showSlideAtIndex(idx: number) {
      setActiveIndex(idx);
    }
  }));

  return [
    <AliceCarousel
      disableDotsControls
      disableButtonsControls
      autoWidth
      infinite
      animationType="fadeout"
      animationDuration={800}
      animationEasingFunction="ease-in-out"
      items={items}
      activeIndex={activeIndex}
      onSlideChanged={onSlideChanged}
    />
  ];
});

export default Carousel;
