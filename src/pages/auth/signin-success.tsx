import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useQuery, useMutation } from "@apollo/client";
import {
  FavoritesDocument,
  ShoppingBagItemsDocument,
  AddPhotoToFavoritesDocument,
  AddProductToShoppingBagDocument
} from "../../graphql-operations";
import { Flex, Heading } from "bumbag";

const SigninSuccess: React.FC = () => {
  const session = useSession();
  const router = useRouter();
  const [addToFavorites] = useMutation(AddPhotoToFavoritesDocument);
  const [addToShoppingBag] = useMutation(AddProductToShoppingBagDocument);

  if (typeof window !== "undefined" && session) {
    const newFav = localStorage.getItem("favPhoto");
    if (newFav) {
      addToFavorites({
        variables: { photoId: parseInt(newFav) }
      });
      localStorage.removeItem("favPhoto");
    }

    const newBagItem = localStorage.getItem("bagProduct");
    if (newBagItem) {
      addToShoppingBag({
        variables: { productId: parseInt(newBagItem) }
      });
      localStorage.removeItem("bagProduct");
    }

    useQuery(FavoritesDocument);

    useQuery(ShoppingBagItemsDocument);

    const url = localStorage.getItem("redirectUrl");
    if (url) {
      console.log(`should be pushing to ${url}`);
      localStorage.removeItem("redirectUrl");
      router.push(url);
    } else {
      router.push("/gallery/beast");
    }
  }

  return (
    <Flex width="90%" maxWidth="700px" marginX="auto" alignX="center" height="70vh" alignY="center">
      <Heading use="h4">Thanks for signing in!</Heading>
    </Flex>
  );
};

export default SigninSuccess;
