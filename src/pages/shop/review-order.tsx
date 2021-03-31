import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/client";

import { ShoppingBagItemsDocument } from "../../graphql-operations";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import BagItem from "../../components/BagItem";

import { Heading, Text, Flex, Box, Divider, Button } from "bumbag";
import { fetchPostJSON } from "../../utils/api-helpers";

const ReviewOrderPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [session] = useSession();

  const { loading, error, data } = useQuery(ShoppingBagItemsDocument);

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (!data) return null;

  if (!session) {
    return (
      <Flex width="90vw" maxWidth="1200px" marginX="auto" marginY="major-5">
        <Heading>Must be signed in to review order.</Heading>
      </Flex>
    );
  }

  const products = data.shoppingBagItems.dataList;

  if (!products || products.length === 0) {
    return (
      <Flex flexDirection="column" width="90vw" maxWidth="1200px" marginX="auto" marginY="major-5">
        <Heading use="h3">Your cart is empty.</Heading>
      </Flex>
    );
  }

  let orderPrice = 0;
  products.forEach(product => {
    orderPrice += product.totalRetailPrice;
  });

  const shippingCharge = 20;

  const handleClick = async () => {
    setIsLoading(true);

    const response = await fetchPostJSON(`/api/checkout_sessions/cart`, products);

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }
  };

  return (
    <Flex flexDirection="column" width="90vw" maxWidth="800px" marginX="auto" marginY="major-5">
      <Heading>Review Your Order</Heading>
      {products.map(product => (
        <Box key={product.id} width="100%" paddingTop="major-4">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <BagItem item={product} />
        </Box>
      ))}
      <Flex flexDirection="column" width="40%" marginLeft="auto" marginRight="12px">
        <Flex flexDirection="row" justifyContent="space-between" marginY="major-1">
          <Text.Block>Subtotal</Text.Block>
          <Text.Block>${orderPrice}</Text.Block>
        </Flex>
        <Flex flexDirection="row" justifyContent="space-between" marginY="major-1">
          <Text.Block>Shipping</Text.Block>
          <Text.Block>${shippingCharge}</Text.Block>
        </Flex>
        <Divider marginY="major-1" />
        <Flex flexDirection="row" justifyContent="space-between" marginY="major-1">
          <Text.Block fontWeight="700" fontSize="400" color="info500">
            Total
          </Text.Block>
          <Text.Block fontWeight="700" fontSize="400" color="info500">
            ${orderPrice + shippingCharge}
          </Text.Block>
        </Flex>
      </Flex>
      <Button
        role="link"
        palette="primary"
        size="large"
        width="200px"
        marginLeft="auto"
        marginRight="0px"
        marginY="5rem"
        onClick={handleClick}
      >
        Checkout
      </Button>
    </Flex>
  );
};

export default ReviewOrderPage;
