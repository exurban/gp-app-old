import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  AllPhotosAtLocationDocument,
  AllPhotosAtLocationInput,
  PhotoInfoFragment
} from "../../../graphql-operations";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";
import Carousel from "../../../components/Carousel";
import CarouselItem from "../../../components/CarouselItem";
import CarouselMenu from "../../../components/CarouselMenu";
import { Text, space, styled } from "bumbag";

const LocationCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePhoto, setActivePhoto] = useState<PhotoInfoFragment>();

  useEffect(() => {
    if (sku && typeof sku === "string") {
      const skuNum = parseInt(sku);
      const index = photos.findIndex(x => x.sku === skuNum);
      setActiveIndex(index);
    }
  }, []);

  useEffect(() => {
    if (!photos || !activeIndex) {
      return;
    }
    setActivePhoto(photos[activeIndex]);
  }, [activeIndex, setActiveIndex]);

  const router = useRouter();
  const { name, sku } = router.query;

  // * fetch all photos in section
  const input = { name: name } as AllPhotosAtLocationInput;
  const { loading, error, data } = useQuery(AllPhotosAtLocationDocument, {
    variables: { input: input }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (!data) return null;

  const { total, photos } = data.allPhotosAtLocation;

  const items = photos.map((photo, idx) => <CarouselItem photo={photo} idx={idx} />);

  return (
    <>
      <Counter>
        {activeIndex + 1} of {total}
      </Counter>
      {activePhoto && <CarouselMenu photo={photos[activeIndex]} />}

      <Carousel items={items} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </>
  );
};

export default LocationCarousel;

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
