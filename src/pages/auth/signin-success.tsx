import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useQuery, useMutation } from "@apollo/client";
import {
  FavoritesDocument,
  ShoppingBagItemsDocument,
  AddPhotoToFavoritesDocument,
  AddPhotoToShoppingBagDocument
} from "../../graphql-operations";
import { Flex } from "bumbag";

const SigninSuccess: React.FC = () => {
  const session = useSession();
  const router = useRouter();
  const [addToFavorites] = useMutation(AddPhotoToFavoritesDocument);
  const [addToShoppingBag] = useMutation(AddPhotoToShoppingBagDocument);

  if (typeof window !== "undefined" && session) {
    const newFav = localStorage.getItem("favPhoto");
    if (newFav) {
      addToFavorites({
        variables: { photoId: parseInt(newFav) }
      });
      localStorage.removeItem("favPhoto");
    }

    const newBagItem = localStorage.getItem("bagPhoto");
    if (newBagItem) {
      addToShoppingBag({
        variables: { photoId: parseInt(newBagItem) }
      });
      localStorage.removeItem("bagPhoto");
    }

    useQuery(FavoritesDocument);

    useQuery(ShoppingBagItemsDocument);

    const url = localStorage.getItem("lastUrl");
    if (url) {
      localStorage.removeItem("lastUrl");
      router.push(url);
    } else {
      router.push("/gallery/beast");
    }
  }

  return (
    <Flex width="90%" maxWidth="700px" marginX="auto" alignX="center" height="70vh" alignY="center">
      Thanks for signing in! You're being sent back from whence you came.
    </Flex>
  );
};

export default SigninSuccess;
