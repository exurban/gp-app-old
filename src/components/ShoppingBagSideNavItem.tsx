import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { ShoppingBagItemsDocument } from "../graphql-operations";
import { Text, Badge } from "bumbag";

const ShoppingBagSideNavItem: React.FC = () => {
  const { data } = useQuery(ShoppingBagItemsDocument);

  const shoppingBagItemsCount = useMemo(() => {
    return data?.shoppingBagItems.dataList ? data.shoppingBagItems.dataList.length : 0;
  }, [data]);

  return (
    <>
      <Text>Shopping Bag</Text>
      {shoppingBagItemsCount > 0 && (
        <Badge palette="secondary" marginLeft="major-1">
          {shoppingBagItemsCount}
        </Badge>
      )}
    </>
  );
};

export default ShoppingBagSideNavItem;
