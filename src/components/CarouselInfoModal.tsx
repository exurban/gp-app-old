import { Modal, Box, Flex, Text, Card, Button, Icon, applyTheme } from "bumbag";
import { PhotoInfoFragment } from "../graphql-operations";

type Props = {
  photo: PhotoInfoFragment;
};

const IconButton = applyTheme(Button, {
  styles: {
    base: {
      fontSize: "14px"
    }
  },
  defaultProps: {
    variant: "ghost",
    color: "#babbba",
    _hover: {
      color: "white"
    },
    _focus: {
      boxShadow: "none"
    }
  }
});

const DropdownMenuItem = applyTheme(Box, {
  defaultProps: {
    color: "#babbba",
    backgroundColor: "2f2e30",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    paddingY: "6px",
    paddingX: "major-2",
    _hover: {
      backgroundColor: "#434244",
      color: "white"
    },
    _focus: {
      outline: "unset"
    },
    ":not(:disabled):hover": {
      backgroundColor: "#434244",
      color: "white"
    }
  }
});

const CloseButton = applyTheme(Button.Close, {
  styles: {
    base: {
      fontSize: "14px"
    }
  },
  defaultProps: {
    variant: "ghost",
    background: "#1b1a1c",
    color: "#babbba",
    _hover: {
      color: "white"
    },
    _focus: {
      boxShadow: "none"
    }
  }
});

const CarouselInfoModal: React.FC<Props> = ({ photo }) => {
  return (
    <Modal.State animated>
      <Modal.Disclosure use={DropdownMenuItem}>
        <Icon
          aria-label="info"
          icon="solid-info-circle"
          marginRight="major-1"
          verticalAlign="-0.125em"
        />
        <Text>Info</Text>
      </Modal.Disclosure>

      <Modal fade>
        <Card background="#1b1a1c" padding="major-1" altitude="300">
          <Modal.Disclosure use={CloseButton}></Modal.Disclosure>
          <Box className="info-text" paddingX="major-4" paddingY="major-2" color="white900">
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
        </Card>
      </Modal>
    </Modal.State>
  );
};

export default CarouselInfoModal;
