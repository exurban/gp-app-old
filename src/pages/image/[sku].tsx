import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import {
  PhotoInfoFragment,
  PhotoWithSkuDocument,
  ImageInfoFragment
} from "../../graphql-operations";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { Flex, applyTheme, Text, Button, Icon, styled } from "bumbag";
import { NextSeo } from "next-seo";
import { TwitterShareButton, TwitterIcon } from "react-share";

const Photo: React.FC = () => {
  const router = useRouter();

  const { sku } = router.query;
  console.log(`sku is ${sku}`);

  let skuInt = 0;
  if (sku && typeof sku === "string") {
    skuInt = parseInt(sku);
  }
  const { loading, error, data } = useQuery(PhotoWithSkuDocument, {
    variables: { sku: skuInt }
  });

  if (!data) {
    return null;
  }

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message="Error loading photos." />;

  const photo: PhotoInfoFragment = data.photoWithSku;
  const image: ImageInfoFragment = photo.images[0];

  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          url: document.location.href,
          title: photo.title,
          text: photo.description
        })
        .then(() => console.log(`Share was successful.`))
        .catch(error => console.log(`Sharing failed:`, error));
    } else {
      console.log(`Your browser doesn't support file sharing.`);
    }
  };

  const StyledImage = styled(Image)`
    border-radius: 4px;
  `;

  const IconButton = applyTheme(Button, {
    styles: {
      base: {
        fontSize: "14px"
      }
    },
    defaultProps: {
      palette: "primary",
      variant: "ghost",
      size: "small",
      color: "#babbba",
      _hover: {
        backgroundColor: "#babbba",
        color: "#1b1c1a"
      },
      _focus: {
        boxShadow: "none"
      }
    }
  });

  return (
    <>
      <NextSeo
        title={photo.title}
        description={photo.description}
        canonical={`https://www.gibbs-photography.com/image/${photo.sku}`}
        openGraph={{
          url: `https://www.gibbs-photography.com/image/${photo.sku}`,
          title: photo.title,
          description: photo.description,
          images: [
            {
              url: photo.images?.[0].imageUrl,
              width: photo.images?.[0].width,
              height: photo.images?.[0].height,
              alt: photo.images?.[0].altText
            }
          ],
          site_name: "Gibbs Photography"
        }}
      />
      <Flex
        className="image-metadata-wrapper"
        flexDirection="column"
        // width="1800px"
        width={image.isPortrait ? "800px" : "1800px"}
        height="100vh"
        alignX="center"
        alignY="center"
      >
        <Flex flexDirection="row" width="98%" justifyContent="space-between">
          <TwitterShareButton
            url={"https://gibbs-photography.com"}
            title={"Explore your wild side"}
            hashtags={["wildside"]}
          >
            <TwitterIcon size={24} style={{ borderRadius: "50%" }} />
            <NextSeo
              title={photo.title}
              description={photo.description}
              canonical={`https://www.gibbs-photography.com/image/${photo.sku}`}
              openGraph={{
                url: `https://www.gibbs-photography.com/image/${photo.sku}`,
                title: photo.title,
                description: photo.description,
                images: [
                  {
                    url: photo.images?.[0].imageUrl,
                    width: photo.images?.[0].width,
                    height: photo.images?.[0].height,
                    alt: photo.images?.[0].altText
                  }
                ],
                site_name: "Gibbs Photography"
              }}
            />
            <Text.Block>Twitter</Text.Block>
          </TwitterShareButton>
          <IconButton>
            <Icon aria-label="share" icon="solid-shareAlt" fontSize="300" onClick={() => share()} />
          </IconButton>
          <Text.Block
            fontSize="400"
            fontWeight="300"
            color="#babbba"
            margin="0px"
            padding="0px"
            alignSelf="flex-end"
          >
            {photo.title}
          </Text.Block>

          <Button.Close size="large" color="#babbba" onClick={() => router.back()} />
        </Flex>
        <div style={{ width: "100%", padding: "20px", position: "relative" }}>
          <StyledImage
            src={image.imageUrl}
            width={image.width}
            height={image.height}
            // sizes=
            layout="responsive"
            quality={100}
            className="image-wrapper"
          />
        </div>
        <Flex fontSize="150" color="#babbba" justifyContent="space-between" width="90%">
          <Text.Block fontSize="150" color="#babbba">
            {photo.photographer?.name}
          </Text.Block>
          <Text.Block fontSize="150" color="#babbba">
            {photo.description}
          </Text.Block>
          <Text.Block fontSize="150" color="#babbba">
            {photo.location?.name}
            {/* W:{image.width} H:{image.height} Q: */}
          </Text.Block>
        </Flex>
      </Flex>
    </>
  );
};

export default Photo;
