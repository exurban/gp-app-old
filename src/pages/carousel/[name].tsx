import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../../graphql-operations";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import Carousel from "../../components/Carousel";
import CarouselItem from "../../components/CarouselItem";
import CarouselMenu from "../../components/CarouselMenu";
import { Text, Button, Icon, styled } from "bumbag";

interface CarouselRef {
  prevSlide: () => void;
  nextSlide: () => void;
  showSlideAtIndex: (arg0: number) => void;
}

const PhotoCarousel: React.FC = () => {
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
    if (sku && typeof sku === "string") {
      const skuNum = parseInt(sku);
      const index = photos.findIndex(x => x.sku === skuNum);
      carouselRef.current?.showSlideAtIndex(index);
    }
  }, []);

  const router = useRouter();
  const { name, sku } = router.query;

  console.log(`sku: ${sku}`);
  console.log(`name: ${name}`);

  // * fetch all photos in section
  const input = { name: name } as AllPhotosOfSubjectInput;
  const { loading, error, data } = useQuery(AllPhotosOfSubjectDocument, {
    variables: { input: input }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (!data) return null;

  const { total, photos } = data.allPhotosOfSubject;

  const items = photos.map((photo, idx) => <CarouselItem photo={photo} idx={idx} />);

  return (
    <>
      <Text.Block color="#babbba" position="absolute" top="24px" right="80px" zIndex="20">
        {activeIndex + 1} of {total}
      </Text.Block>
      <CarouselMenu photo={photos[activeIndex]} />
      <PrevButton variant="ghost" zIndex="20" onClick={() => carouselRef.current?.prevSlide()}>
        <Icon aria-label="previous" icon="solid-chevron-left" />
      </PrevButton>
      <Carousel
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        items={items}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={carouselRef}
      />
      <NextButton variant="ghost" zIndex="20" onClick={() => carouselRef.current?.nextSlide()}>
        <Icon aria-label="next" icon="solid-chevron-right" />
      </NextButton>
    </>
  );
};

export default PhotoCarousel;

const PrevButton = styled(Button)`
  position: absolute;
  top: 50vh;
  left: 10px;
  font-size: 60px;
  color: #babbba;
  transition: none;
  :hover {
    color: #fff;
  }
`;

const NextButton = styled(Button)`
  position: absolute;
  top: 50vh;
  right: 10px;
  font-size: 60px;
  color: #babbba;
  transition: none;
  :hover {
    color: #fff;
  }
`;
