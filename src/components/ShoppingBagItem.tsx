import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { ShoppingBagItemsDocument } from "../graphql-operations";
import { Flex, Badge, Icon, Text } from "bumbag";

type Props = {
  size: string;
};

const ShoppingBagItem: React.FC<Props> = ({ size }) => {
  const { data } = useQuery(ShoppingBagItemsDocument);

  const shoppingBagItemsCount = useMemo(() => {
    return data?.shoppingBagItems.photoList ? data.shoppingBagItems.photoList.length : 0;
  }, [data]);

  return (
    <Flex
      className="right-nav-item"
      flexDirection="column"
      marginBottom={size === "large" ? "major-1" : "0px"}
      height="100%"
      justifyContent={size === "small" ? "center" : "flex-end"}
      paddingX={size === "small" ? "major-1" : "0px"}
    >
      <Icon
        aria-label="shopping bag"
        icon="solid-shopping-bag"
        margin="0 auto"
        fontSize="1.25rem"
      />
      {size === "large" && (
        <Text marginTop="minor-1" fontSize="0.875rem" fontWeight="200" marginX="auto">
          Bag
        </Text>
      )}
      {shoppingBagItemsCount > 0 && (
        <Badge isAttached palette="secondary">
          {shoppingBagItemsCount}
        </Badge>
      )}
    </Flex>
  );
};

export default ShoppingBagItem;
