import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../../graphql-operations";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import Carousel from "../../components/Carousel";
import CarouselItem from "../../components/CarouselItem";
import CarouselMenu from "../../components/CarouselMenu";
import { space, Text, Button, Icon, styled } from "bumbag";
import { isMobile } from "react-device-detect";

interface CarouselRef {
  prevSlide: () => void;
  nextSlide: () => void;
  showSlideAtIndex: (arg0: number) => void;
}

const PhotoCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = useRef<CarouselRef>();

  const handleKeyDown = (event: { keyCode: number }) => {
    switch (event.keyCode) {
      case 37:
      case 38: {
        carouselRef.current?.prevSlide();
        break;
      }
      case 39:
      case 40: {
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
      <Counter>
        {activeIndex + 1} of {total}
      </Counter>
      <CarouselMenu photo={photos[activeIndex]} />
      {!isMobile && (
        <PrevButton variant="ghost" zIndex="20" onClick={() => carouselRef.current?.prevSlide()}>
          <Icon aria-label="previous" icon="solid-chevron-left" />
        </PrevButton>
      )}
      <Carousel
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        items={items}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={carouselRef}
        style={{ overflowY: "hidden", overscrollBehaviorY: "none" }}
      />
      {!isMobile && (
        <NextButton variant="ghost" zIndex="20" onClick={() => carouselRef.current?.nextSlide()}>
          <Icon aria-label="next" icon="solid-chevron-right" />
        </NextButton>
      )}
    </>
  );
};

export default PhotoCarousel;

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
