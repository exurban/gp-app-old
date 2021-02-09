import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Box, Button } from "bumbag";
import Carousel from "../../components/Carousel";

const url1 =
  "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1109-1612574261066.webp";

const url2 =
  "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1195-1612573940876.webp";

const url3 =
  "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1194-1612573799739.webp";

const url4 =
  "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1191-1612573632759.webp";

const url5 =
  "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1183-1612572899667.webp";

const handleDragStart = (event: DragEvent<any>) => {
  event.preventDefault();
  console.log(`drag started with event: ${event.target.className} ${event.movementX}`);
};
const items = [
  <Box
    className="item"
    data-value="1"
    key={1}
    height="90vh"
    alignX="center"
    alignY="center"
    borderRadius="20px"
    onDragStart={handleDragStart}
  >
    <Image
      alt="demo"
      src={url1}
      // height={photo.images?.[0].height}
      // width={photo.images?.[0].width}
      layout="fill"
      objectFit="contain"
      quality={80}
    />
  </Box>,
  <Box
    className="item"
    data-value="2"
    key={2}
    height="90vh"
    alignX="center"
    alignY="center"
    onDragStart={handleDragStart}
  >
    <Image
      alt="demo"
      src={url2}
      // height={photo.images?.[0].height}
      // width={photo.images?.[0].width}
      layout="fill"
      objectFit="contain"
      quality={80}
    />
  </Box>,
  <Box
    className="item"
    data-value="3"
    key={3}
    height="90vh"
    alignX="center"
    alignY="center"
    onDragStart={handleDragStart}
  >
    <Image
      alt="demo"
      src={url3}
      // height={photo.images?.[0].height}
      // width={photo.images?.[0].width}
      layout="fill"
      objectFit="contain"
      quality={80}
    />
  </Box>,
  <Box
    className="item"
    data-value="4"
    key={4}
    height="90vh"
    alignX="center"
    alignY="center"
    onDragStart={handleDragStart}
  >
    <Image
      alt="demo"
      src={url4}
      // height={photo.images?.[0].height}
      // width={photo.images?.[0].width}
      layout="fill"
      objectFit="contain"
      quality={80}
    />
  </Box>,
  <Box
    className="item"
    data-value="5"
    key={5}
    height="90vh"
    alignX="center"
    alignY="center"
    onDragStart={handleDragStart}
  >
    <Image
      alt="demo"
      src={url5}
      // height={photo.images?.[0].height}
      // width={photo.images?.[0].width}
      layout="fill"
      objectFit="contain"
      quality={80}
    />
  </Box>
];

interface CarouselRef {
  prevSlide: () => void;
  nextSlide: () => void;
  showSlideAtIndex: (arg0: number) => void;
}

const AliceTest = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = useRef<CarouselRef>();

  // const slidePrev = () => setActiveIndex(activeIndex - 1);
  // const slideNext = () => setActiveIndex(activeIndex + 1);
  // const onSlideChanged = ({ item }) => setActiveIndex(item);
  const handleKeyDown = (event: { keyCode: number }) => {
    switch (event.keyCode) {
      case 37:
      case 38: {
        console.log(`previous`);
        carouselRef.current?.prevSlide();
        break;
      }
      case 39:
      case 40: {
        console.log(`next`);
        carouselRef.current?.nextSlide();
        break;
      }
      case 73: {
        console.log(`show info`);
        break;
      }
      case 27: {
        console.log(`hide info`);
        break;
      }
      default:
        console.log(`key down ${event.keyCode}`);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    {
      console.log(`Active Index: ${activeIndex}`);
    }
  }, [activeIndex, setActiveIndex]);

  const skipToStart = () => {
    carouselRef.current?.showSlideAtIndex(0);
  };

  return (
    <>
      <Button onClick={() => skipToStart()}>Skip</Button>
      <Carousel
        items={items}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        ref={carouselRef}
      />
    </>
  );
};

export default AliceTest;
