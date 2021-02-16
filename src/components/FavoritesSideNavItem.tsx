import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { FavoritesDocument } from "../graphql-operations";
import { Text, Badge } from "bumbag";

const FavoritesSideNavItem: React.FC = () => {
  const { data } = useQuery(FavoritesDocument);

  const favoritesCount = useMemo(() => {
    return data?.favorites.photoList ? data.favorites.photoList.length : 0;
  }, [data]);

  return (
    <>
      <Text>Favorites</Text>
      {favoritesCount > 0 && (
        <Badge palette="secondary" marginLeft="major-1">
          {favoritesCount}
        </Badge>
      )}
    </>
  );
};

export default FavoritesSideNavItem;
