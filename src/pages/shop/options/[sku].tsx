import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery, useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import {
  PhotoAndFinishOptionsForSkuDocument,
  PrintInfoFragment,
  MatInfoFragment,
  FrameInfoFragment,
  AddProductDocument,
  AddProductMutationVariables
} from "../../../graphql-operations";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";
import { NextSeo } from "next-seo";
import { Flex, Text, Heading, styled, Divider, Button } from "bumbag";

import PrintTypeCard from "../../../components/PrintTypeCard";
import SelectPrintSize from "../../../components/SelectPrintSize";
import SelectMat from "../../../components/SelectMat";
import SelectFrame from "../../../components/SelectFrame";

const ConfigureForPurchasePage: React.FC = () => {
  const [session] = useSession();
  const router = useRouter();

  const [selectedPrintType, setSelectedPrintType] = useState<string | undefined>(undefined);
  const [selectedPrint, setSelectedPrint] = useState<PrintInfoFragment | undefined>(undefined);
  const [matsToDisplay, setMatsToDisplay] = useState<MatInfoFragment[] | undefined>(undefined);
  const [selectedMat, setSelectedMat] = useState<MatInfoFragment | undefined>(undefined);
  const [framesToDisplay, setFramesToDisplay] = useState<FrameInfoFragment[] | undefined>(
    undefined
  );
  const [selectedFrame, setSelectedFrame] = useState<FrameInfoFragment | undefined>(undefined);

  const [addProduct] = useMutation(AddProductDocument, {
    onCompleted(data) {
      // * if user was signed in, product was added to bag upon creation--push to review-order
      if (session && data.addProduct.success && !data.addProduct.newProduct) {
        router.push("/shop/review-order");
      }

      // * if user not signed in, save product id to localStorage and push to signin, add product to bag upon successful signin, then push to review-order
      if (!session) {
        localStorage.setItem("redirectUrl", "https://gibbs-photography.com/shop/review-order");
        if (data.addProduct.newProduct) {
          localStorage.setItem("bagProduct", data.addProduct.newProduct.id);
        }

        router.push("/auth/signin");
      }
    }
  });

  // * get location's name from router
  const { sku } = router.query;

  let skuInt = 0;
  if (sku && typeof sku === "string") {
    skuInt = parseInt(sku);
  }

  useEffect(() => {
    if (selectedPrintType) {
      setSelectedPrint(undefined);
    }
  }, [selectedPrintType, setSelectedPrintType]);

  useEffect(() => {
    if (selectedPrint) {
      const matSelections = mats?.filter(
        mt => mt.dimension1 === selectedPrint.dimension1 && mt.printType === selectedPrintType
      );
      setMatsToDisplay(matSelections);
      const frameSelections = frames?.filter(
        fr => fr.dimension1 === selectedPrint.dimension1 && fr.printType === selectedPrint.type
      );
      setFramesToDisplay(frameSelections);
    }
  }, [selectedPrint, setSelectedPrint]);

  const { loading, error, data } = useQuery(PhotoAndFinishOptionsForSkuDocument, {
    variables: { sku: skuInt }
  });

  if (error) return <ErrorMessage message="Error loading photo." />;

  if (loading) return <Loader />;

  if (!data) return null;

  const { photo, prints, mats, frames } = data.photoAndFinishOptionsForSku;

  if (!photo) return null;

  const image = photo.images[0];
  const aspectRatio = image.aspectRatio;
  const pgName = photo?.photographer?.name as string;
  const locationName = photo?.location?.name as string;

  const imagePrices = [
    {
      size: 12,
      price: photo.retailPrice12
    },
    {
      size: 16,
      price: photo.retailPrice16
    },
    {
      size: 20,
      price: photo.retailPrice20
    },
    {
      size: 24,
      price: photo.retailPrice24
    },
    {
      size: 30,
      price: photo.retailPrice30
    }
  ];

  if (!prints) return null;

  const paperPrints = prints.filter(p => p.type === "paper");
  const paperPrices = imagePrices.map((ip, idx) => ip.price + paperPrints[idx].retailPrice);
  const lowestPricePaper = Math.min(...paperPrices);

  // const lowestPricePaper = paperPrints?.reduce(
  //   (min, p) => (p.retailPrice < min ? p.retailPrice : min),
  //   paperPrints[0].retailPrice
  // );
  const aluPrints = prints.filter(p => p.type === "alu");
  const aluPrices = imagePrices.map((ip, idx) => ip.price + aluPrints[idx].retailPrice);
  const lowestPriceAlu = Math.min(...aluPrices);

  // const lowestPriceAlu = aluPrints?.reduce(
  //   (min, p) => (p.retailPrice < min ? p.retailPrice : min),
  //   aluPrints[0].retailPrice
  // );

  const StyledImage = styled(Image)`
    border-radius: 4px;
  `;

  const createProduct = () => {
    let matId, frameId;
    if (!selectedPrint) return;
    if (selectedMat) {
      matId = parseInt(selectedMat.id);
    }

    if (selectedFrame) {
      frameId = parseInt(selectedFrame.id);
    }

    const input = {
      photoId: parseInt(photo.id),
      printId: parseInt(selectedPrint.id),
      matId: matId,
      frameId: frameId
    };

    const addVariables: AddProductMutationVariables = { input };

    addProduct({
      variables: addVariables
    });
  };

  return (
    <>
      <NextSeo
        title={`${photo.title}`}
        description={`${photo.description}`}
        openGraph={{
          url: `https://gibbs-photography.com/image/${photo.sku}`,
          images: [
            {
              url: image.imageUrl
            }
          ]
        }}
      />

      <Flex className="page-wrapper" width="100%" alignX="center" marginY="major-4">
        <Flex className="content-wrapper" width="90vw" maxWidth="720px" flexDirection="column">
          <StyledImage
            src={image.imageUrl}
            layout="intrinsic"
            width={image.width / 2}
            height={image.height / 2}
          />
          <Heading use="h2" textAlign="center" marginTop="major-4">
            {photo.title}
          </Heading>

          <Heading use="h5" marginBottom="major-2">
            {pgName}
          </Heading>
          <Text.Block marginBottom="major-3">
            <Text marginBottom="major-2" color="secondary">
              {locationName}
            </Text>
          </Text.Block>

          <Text.Block fontSize="400" marginY="major-3">
            {photo.description}
          </Text.Block>
          <Divider />
          <Heading use="h5" marginY="major-3">
            Choose your material.
          </Heading>
          <Flex
            className="finish-options-wrapper"
            flexDirection="column"
            width="100%"
            marginX="auto"
            marginBottom="major-3"
            justifyContent="space-around"
          >
            <PrintTypeCard
              type="paper"
              displayName="Exhibition Paper"
              lowestPrice={lowestPricePaper}
              description="The high-resolution image is printed in ink on fine-art quality paper. This paper print may be ordered separately, or finished with your choice of a single mat and wood or metal frame."
              selectedPrintType={selectedPrintType}
              setSelectedPrintType={setSelectedPrintType}
            />
            <PrintTypeCard
              type="alu"
              displayName="Aluminum"
              lowestPrice={lowestPriceAlu}
              description="The high-resolution image is rendered by infusing dyes into the surface of a specially-coated aluminum sheet. This aluminum print may be ordered separately, or mounted in your choice of a float frame."
              selectedPrintType={selectedPrintType}
              setSelectedPrintType={setSelectedPrintType}
            />
          </Flex>
          {aspectRatio && selectedPrintType && (
            <>
              <SelectPrintSize
                prints={prints.filter(p => p.type === selectedPrintType)}
                imagePrices={imagePrices}
                selectedPrint={selectedPrint}
                setSelectedPrint={setSelectedPrint}
              />
            </>
          )}
          {selectedPrint && (
            <>
              <SelectMat
                mats={matsToDisplay}
                selectedMat={selectedMat}
                setSelectedMat={setSelectedMat}
              />
              <SelectFrame
                frames={framesToDisplay}
                selectedFrame={selectedFrame}
                setSelectedFrame={setSelectedFrame}
              />
            </>
          )}

          <Button
            palette="primary"
            width="120px"
            margin="40px 0 40px auto"
            disabled={selectedPrint === undefined}
            onClick={() => createProduct()}
          >
            Add to Bag
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default ConfigureForPurchasePage;
