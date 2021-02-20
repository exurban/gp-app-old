import { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Text, Icon, Button, space, styled } from "bumbag";

const photo1 = (
  <img src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1041-1612552833729.webp" />
);

const photo2 = (
  <img src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1042-1612553082805.webp" />
);

const photo3 = (
  <img src="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1044-1612553583607.webp" />
);

const photos = [photo1, photo2, photo3];
const items = photos.map(photo => {
  return (
    <div
      className="item"
      style={{
        maxWidth: "1400px",
        maxHeight: "700px",
        objectFit: "contain",
        backgroundColor: "#ccc"
      }}
    >
      {photo}
    </div>
  );
});

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSlideChanged = ({ item }) => {
    console.log(`onSlideChanged called ${activeIndex}.`);
    setActiveIndex(item);
    console.log(`onSlideChanged called ${item}.`);
  };

  return (
    <>
      <Counter>
        {activeIndex + 1} of {items.length}
      </Counter>
      <div className="carousel-wrapper" style={{ width: "100vw", height: "90vh" }}>
        <AliceCarousel
          autoWidth
          disableButtonsControls
          infinite
          animationType="fadeout"
          animationDuration={800}
          mouseTracking
          items={items}
          activeIndex={activeIndex}
          onSlideChanged={onSlideChanged}
        />
      </div>
      <p>{activeIndex}</p>
      <button onClick={slidePrev}>Prev</button>
      <button onClick={slideNext}>Next</button>
      <PrevButton variant="ghost" onClick={slidePrev}>
        <Icon aria-label="previous" icon="solid-chevron-left" />
      </PrevButton>
      <NextButton variant="ghost" onClick={slideNext}>
        <Icon aria-label="next" icon="solid-chevron-right" />
      </NextButton>
    </>
  );
};

export default Carousel;

const Counter = styled(Text)`
  position: absolute;
  top: 9px;
  right: 60px;
  z-index: 20;
  padding: ${space(1, "major")}rem;
  border-radius: 6px;
  background-color: rgba(27, 26, 28, 0.7);
  transition: all 0.25s ease;

  :hover {
    color: #fff;
    background-color: rgba(27, 26, 28, 0.9);
  }
`;

const ArrowButton = styled(Button)`
  z-index: 20;
  position: absolute;
  top: 50vh;
  font-size: 60px;
  color: rgba(186, 187, 186, 0.4);
  transition: color 0.25s ease;

  :hover {
    color: #fff;
  }

  :focus {
    box-shadow: none;
  }
`;

const PrevButton = styled(ArrowButton)`
  left: 10px;
`;

const NextButton = styled(ArrowButton)`
  right: 10px;
`;
