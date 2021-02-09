import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../../graphql-operations";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import Carousel from "../../components/Carousel";
import CarouselItem from "../../components/CarouselItem";
import CarouselMenu from "../../components/CarouselMenu";
import { Text } from "bumbag";

interface CarouselRef {
  prevSlide: () => void;
  nextSlide: () => void;
  showSlideAtIndex: (arg0: number) => void;
}

const PhotoCarousel = () => {
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

  const router = useRouter();
  const { name } = router.query;

  const input = { name: name } as AllPhotosOfSubjectInput;
  const { loading, error, data } = useQuery(AllPhotosOfSubjectDocument, {
    variables: { input: input }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (!data) return null;

  const { subjectInfo, total, photos } = data.allPhotosOfSubject;

  const items = photos.map((photo, idx) => <CarouselItem photo={photo} idx={idx} />);

  return (
    <>
      <Text.Block color="#babbba" position="absolute" top="24px" right="80px" zIndex="20">
        {activeIndex + 1} of {total}
      </Text.Block>
      <CarouselMenu photo={photos[activeIndex]} />
      <Carousel
        items={items}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={carouselRef}
      />
    </>
  );
};

export default PhotoCarousel;
