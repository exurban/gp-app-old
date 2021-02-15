import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { FavoritesDocument } from "../graphql-operations";
import { Flex, Badge, Icon, Text } from "bumbag";

type Props = {
  size: string;
};

const FavoritesItem: React.FC<Props> = ({ size }) => {
  const { data } = useQuery(FavoritesDocument);

  const favoritesCount = useMemo(() => {
    return data?.favorites.photoList ? data.favorites.photoList.length : 0;
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
      <Icon aria-label="favorites" icon="regular-star" margin="0 auto" fontSize="1.25rem" />
      {size === "large" && (
        <Text marginTop="minor-1" fontSize="0.875rem" fontWeight="200" marginX="auto">
          Favorites
        </Text>
      )}
      {favoritesCount > 0 && (
        <Badge isAttached palette="secondary">
          {favoritesCount}
        </Badge>
      )}
    </Flex>
  );
};

export default FavoritesItem;
