import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { AllFeaturedPhotosDocument } from "../../graphql-operations";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import CarouselItem from "../../components/CarouselItem";
import CarouselMenu from "../../components/CarouselMenu";
import { space, Text, Button, Icon, styled } from "bumbag";
import { isMobile } from "react-device-detect";

const FeaturedCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (sku && typeof sku === "string") {
      const skuNum = parseInt(sku);
      const index = photos.findIndex(x => x.sku === skuNum);
      setActiveIndex(index);
    }
  }, []);

  const router = useRouter();
  const { sku } = router.query;

  // * fetch all photos in section

  const { loading, error, data } = useQuery(AllFeaturedPhotosDocument);

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (!data) return null;

  const { total, photos } = data.allFeaturedPhotos;

  const items = photos.map((photo, idx) => <CarouselItem photo={photo} idx={idx} />);

  const slidePrev = () => {
    if (activeIndex === 0) {
      setActiveIndex(total - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };
  const slideNext = () => {
    if (activeIndex + 1 === total) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSlideChanged = ({ item }) => {
    setActiveIndex(item);
  };

  return (
    <>
      <Counter>
        {activeIndex + 1} of {total}
      </Counter>
      <CarouselMenu photo={photos[activeIndex]} />
      {!isMobile && (
        <PrevButton variant="ghost" zIndex="20" onClick={() => slidePrev()}>
          <Icon aria-label="previous" icon="solid-chevron-left" />
        </PrevButton>
      )}
      <AliceCarousel
        disableDotsControls
        disableButtonsControls
        infinite
        animationType="fadeout"
        animationDuration={800}
        animationEasingFunction="ease-in-out"
        items={items}
        activeIndex={activeIndex}
        onSlideChanged={onSlideChanged}
      />
      {!isMobile && (
        <NextButton variant="ghost" zIndex="20" onClick={() => slideNext()}>
          <Icon aria-label="next" icon="solid-chevron-right" />
        </NextButton>
      )}
    </>
  );
};

export default FeaturedCarousel;

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
