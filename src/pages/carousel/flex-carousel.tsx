import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../../graphql-operations";

import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import CarouselInfoModal from "../../components/CarouselInfoModal";
import { Box, Flex, Grid, Heading } from "bumbag";

const FlexCarousel = () => {
  const scrollContainer = useRef();

  const { loading, error, data } = useQuery(AllPhotosOfSubjectDocument, {
    variables: {
      input: { name: "land" }
    }
  });

  const handleKeyDown = (event: { keyCode: number }) => {
    switch (event.keyCode) {
      case 37:
      case 38: {
        console.log(`previous`);

        const el = document.getElementById("photo5");

        const scroller = document.scrollingElement;
        const offsetParent = el?.offsetParent;
        const container = document.getElementById("container");

        if (el && container) {
          const x = el.offsetLeft;
          const ch = el.getBoundingClientRect();
          const par = container.getBoundingClientRect();
          console.log(`CHILD:\nx:${ch.x}\n${ch.y}\nw:${ch.width}\nh:${ch.height}`);
          console.log(`PARENT:\nx:${par.x}\n${par.y}\nw:${par.width}\nh:${par.height}`);
          console.log(el);
          console.log(scroller);
          console.log(offsetParent);
          console.log(container);

          // el.scroll({
          //   top: 0,
          //   left: -82000
          // });

          // el.scrollIntoView();
          // container?.scrollTo({
          //   top: 0,
          //   left: 0 + x,
          //   behavior: "smooth"
          // });
        }
        break;
      }
      case 39:
      case 40: {
        console.log(`next`);

        // console.log(`width of container is: ${container?.innerWidth}`)
        const el = document.getElementById("photo5");
        const container = el?.offsetParent;
        if (el && container) {
          const x = el.offsetLeft;
          console.log(
            `should be scrolling to 1st image at ${x} ${el.offsetLeft} offsetWidth: ${el.offsetWidth} with tab Index: ${el.tabIndex}`
          );
          container?.scrollTo({
            top: 0,
            left: 0 + x,
            behavior: "smooth"
          });
        }

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

  if (error) return <ErrorMessage message="Error loading photos." />;
  if (loading) return <Loader />;

  if (!data) return null;

  const { subjectInfo, total, photos } = data.allPhotosOfSubject;
  const currentPhoto = photos[0];

  return (
    <Grid className="wrapper">
      <CarouselInfoModal photo={currentPhoto} />
      <Flex
        className="container"
        id="container"
        alignX="center"
        overflowX="scroll"
        overflowY="scroll"
        scrollSnapType="x mandatory"
        scrollBehavior="smooth"
        ref={scrollContainer}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {photos.map((photo, idx) => (
          <Box
            className="gallery__img"
            key={photo.id}
            id={`photo${idx}`}
            display="block"
            marginX="20px"
            height="100vh"
            scrollSnapAlign="center"
            background="#1b1a1c"
            alignX="center"
            alignY="center"
            position="relative"
            flex="1 0 auto"
          >
            <Box
              className="image-wrapper"
              // margin="5vw"
              width="100vw"
              background="#569cd6"
              alignX="center"
              alignY="center"
            >
              {/* <Heading color="primary">{photo.sku}</Heading> */}
              {/* <Image
              src={photo.images?.[0].imageUrl}
              width={photo.images?.[0].width}
              height={photo.images?.[0].height}
              layout="responsive"
            /> */}
              {/* <Image src={photo.images?.[0].imageUrl} layout="fixed" width="800px" height="600px" /> */}
              <Image src={photo.images?.[0].imageUrl} layout="fill" objectFit="contain" />
            </Box>
          </Box>
        ))}
      </Flex>
    </Grid>
  );
};

export default FlexCarousel;
