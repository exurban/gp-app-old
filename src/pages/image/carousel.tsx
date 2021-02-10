import { useState } from "react";
import { useQuery } from "@apollo/client";
import { AllPhotosOfSubjectDocument, AllPhotosOfSubjectInput } from "../../graphql-operations";

import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { Box, Flex, Heading, Text, Button, Icon, applyTheme } from "bumbag";
import Image from "next/image";

const Carousel: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const closeInfo = () => {
    setShowInfo(false);
  };

  const toggleInfo = () => {
    console.log(`toggle info`);
    setShowInfo(!showInfo);
  };

  const showPrevious = () => {
    console.log(`Show previous image.`);
    setShowInfo(false);
    let idx;
    if (currentPhoto === 0) {
      idx = total - 1;
    } else {
      idx = currentPhoto - 1;
    }
    setCurrentPhoto(idx);
  };

  const showNext = () => {
    console.log(`Show next image.`);
    setShowInfo(false);
    let idx;
    if (currentPhoto === total - 1) {
      idx = 0;
    } else {
      idx = currentPhoto + 1;
    }
    setCurrentPhoto(idx);
  };

  const { loading, error, data } = useQuery(AllPhotosOfSubjectDocument, {
    variables: {
      input: { name: "beast" }
    }
  });

  if (error) return <ErrorMessage message="Error loading photos." />;
  if (loading) return <Loader />;

  if (!data) return null;

  const { subjectInfo, total, photos } = data.allPhotosOfSubject;

  const photo = photos[currentPhoto];

  const IconButton = applyTheme(Button, {
    styles: {
      base: {
        fontSize: "14px"
      }
    },
    defaultProps: {
      palette: "primary",
      variant: "ghost",
      size: "large",
      color: "#babbba",
      _hover: {
        color: "white"
      },
      _focus: {
        boxShadow: "none"
      }
    }
  });

  const InfoButton = applyTheme(Button, {
    styles: {
      base: {
        fontSize: "14px"
      }
    },
    defaultProps: {
      background: "#1b1a1c",
      variant: "outilned",
      size: "large",
      color: "#babbba",
      _hover: {
        color: "white"
      },
      _focus: {
        boxShadow: "none"
      }
    }
  });

  return (
    <Flex width="100vw" height="100vh" alignX="center" alignY="center">
      <IconButton onClick={() => showPrevious()}>
        <Icon aria-label="Previous Image" icon="solid-chevron-left" fontSize="900" />
      </IconButton>
      <Box
        // height={photo.images?.[0].height}
        // width={photo.images?.[0].width}
        height="100vh"
        width="80vw"
        overflow="hidden"
        zIndex={-1}
        position="fixed"
      >
        <Image
          alt="demo"
          src={photo.images?.[0].imageUrl}
          // height={photo.images?.[0].height}
          // width={photo.images?.[0].width}
          layout="fill"
          objectFit="contain"
          quality={80}
        />
      </Box>
      <Box
        height="100vh"
        width="80vw"
        background="rgba(27, 28, 26, 0.35)"
        zIndex={1}
        position="relative"
        alignY="center"
        alignX="center"
        visibility={showInfo ? "visible" : "hidden"}
      >
        <Box
          background="rgba(27, 28, 26, 0.85)"
          borderRadius="8px"
          padding="major-1"
          color="white900"
        >
          <Button.Close right="10px" color="white900" onClick={() => closeInfo()} />
          <Box className="info-text" marginX="major-4">
            <Text.Block fontSize="600" fontWeight="400" textAlign="center">
              {photo.title}
            </Text.Block>
            <Flex
              flexDirection="row"
              width="100%"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Text.Block fontSize="400" color="#569cd6" marginTop="major-4">
                {photo.photographer?.name}
              </Text.Block>
              <Text.Block fontSize="250" textAlign="right" color="#569cd6" marginTop="major-4">
                $375+
              </Text.Block>
            </Flex>
            <Text.Block marginTop="major-2" fontVariant="small-caps">
              {photo.location?.name}
            </Text.Block>

            <Text.Block marginY="major-3">{photo.description}</Text.Block>
            <Flex justifyContent="space-evenly">
              <IconButton size="default" iconBefore="regular-star">
                Add to Favorites
              </IconButton>
              <IconButton size="default" iconBefore="solid-shopping-bag">
                {" "}
                Add to Bag
              </IconButton>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Flex
        flexDirection="column"
        height="100vh"
        justifyContent="space-between"
        // alignItems="flexStart"
      >
        <InfoButton marginTop="20px" marginLeft="40px" onClick={() => toggleInfo()}>
          Info
        </InfoButton>
        <IconButton marginTop="-2.3em" onClick={() => showNext()}>
          <Icon aria-label="Next Image" icon="solid-chevron-right" fontSize="900" />
        </IconButton>
        <Box height="1em" />
      </Flex>
    </Flex>
  );
};

export default Carousel;
