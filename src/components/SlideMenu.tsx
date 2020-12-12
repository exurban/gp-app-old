import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import { DropdownMenu, DropdownMenuGroup, Text, Icon, Button, applyTheme, useToasts } from "bumbag";
import { AddPhotoToFavoritesDocument, PhotoInfoFragment } from "../graphql-operations";

type Props = {
  setShowInfo: any;
  photo: PhotoInfoFragment;
};

const SlideMenu: React.FC<Props> = ({ setShowInfo, photo }) => {
  const [session] = useSession();
  const router = useRouter();
  const toasts = useToasts();
  const [addToFavorites, { data }] = useMutation(AddPhotoToFavoritesDocument);

  const addPhotoToFavorites = () => {
<<<<<<< Updated upstream
    console.log(`looking for session's api token`);
    if (!session) {
      localStorage.setItem("lastUrl", router.pathname);
      localStorage.setItem("cursor", photo.id);
      router.push(`/auth/signin`);
    } else {
      addToFavorites({ variables: { photoId: parseInt(photo.id) } });

      if (data) {
        console.log(`Added to favorites: ${JSON.stringify(data, null, 2)}`);
        toasts.add({
          title: "Added to Favorites",
          message: `${photo.title} was added to your favorites.`
=======
    if (!session) {
      signinFirst();
      return;
    }

    addToFavorites({
      variables: { photoId: parseInt(photo.id) },
      optimisticResponse: {
        __typename: "Mutation",
        addPhotoToFavorites: {
          success: true,
          message: `Added ${photo.title} to your favorites.`,
          addedPhotoWithId: photo.id,
          __typename: "AddPhotoToFavoritesResponse"
        }
      },
      update: (cache, { data: { ...newFavoriteResponse } }) => {
        const { ...existing } = cache.readQuery({
          query: FavoritesDocument
        });

        // * check to make sure photoId returned from mutation === photo.id, throw error if it doesn't.
        const newFavorite = newFavoriteResponse.addPhotoToFavorites.addedPhotoWithId;
        if (newFavorite != photo.id) {
          console.error(`photo ID returned from server ${newFavorite} does not match photo's ID.`);
        }

        const existingPhotos = existing.favorites?.photoList || [];

        cache.writeQuery({
          query: FavoritesDocument,
          data: {
            favorites: {
              __typename: "FavoritesResponse",
              photoList: photo ? [photo, ...existingPhotos] : [...existingPhotos]
            }
          }
>>>>>>> Stashed changes
        });
      }
    }
<<<<<<< Updated upstream
=======
    removeFromFavorites({
      variables: { photoId: parseInt(photo.id) },
      optimisticResponse: {
        __typename: "Mutation",
        removePhotoFromFavorites: {
          success: true,
          message: `Successfully removed ${photo.title} from your favorites.`,
          removedPhotoWithId: photo.id,
          __typename: "RemovePhotoFromFavoritesResponse"
        }
      },
      update: (cache, { data: { ...removePhotoResponse } }) => {
        const { ...existing } = cache.readQuery({
          query: FavoritesDocument
        });
        const photoToRemove = removePhotoResponse.removePhotoFromFavorites.removedPhotoWithId;
        if (photoToRemove != photo.id) {
          console.error(`photoToRemoveId ${photoToRemove} does not match photo.id ${photo.id}`);
        }
        const existingPhotos = existing.favorites?.photoList || [];

        cache.writeQuery({
          query: FavoritesDocument,
          data: {
            favorites: {
              __typename: "FavoritesResponse",
              photoList: existingPhotos.filter(rec => rec.id != photoToRemove)
            }
          }
        });
      }
    });
>>>>>>> Stashed changes
  };

  const addPhotoToShoppingBag = () => {
    if (!session) {
<<<<<<< Updated upstream
      router.push(`/auth/signin`);
    } else {
      console.log(`Add ${photo.id} to shopping bag.`);
    }
=======
      signinFirst();
    }

    addToShoppingBag({
      variables: { photoId: parseInt(photo.id) },
      optimisticResponse: {
        __typename: "Mutation",
        addPhotoToShoppingBag: {
          success: true,
          message: `Added ${photo.title} to your shopping bag.`,
          addedPhotoWithId: photo.id,
          __typename: "AddPhotoToShoppingBagResponse"
        }
      },
      update: (cache, { data: { ...newBagItemResponse } }) => {
        const { ...existing } = cache.readQuery({
          query: ShoppingBagItemsDocument
        });

        const newShoppingBagItem = newBagItemResponse.addPhotoToShoppingBag.addedPhotoWithId;
        if (newShoppingBagItem != photo.id) {
          console.error(
            `photo ID returned from server ${newShoppingBagItem} does not match photo id ${photo.id}`
          );
        }
        const existingPhotos = existing.shoppingBagItems?.photoList || [];

        cache.writeQuery({
          query: ShoppingBagItemsDocument,
          data: {
            shoppingBagItems: {
              __typename: "ShoppingBagItemsResponse",
              photoList: photo ? [photo, ...existingPhotos] : [...existingPhotos]
            }
          }
        });
      }
    });
  };

  const removePhotoFromShoppingBag = () => {
    if (!session) {
      signinFirst();
      return;
    }
    removeFromShoppingBag({
      variables: { photoId: parseInt(photo.id) },
      optimisticResponse: {
        __typename: "Mutation",
        removePhotoFromShoppingBag: {
          success: true,
          message: `Successfully removed ${photo.title} from your shopping bag.`,
          removedPhotoWithId: photo.id,
          __typename: "RemovePhotoFromShoppingBagResponse"
        }
      },
      update: (cache, { data: { ...removePhotoResponse } }) => {
        const { ...existing } = cache.readQuery({
          query: ShoppingBagItemsDocument
        });
        const photoToRemove = removePhotoResponse.removePhotoFromShoppingBag.removedPhotoWithId;
        if (photoToRemove != photo.id) {
          console.error(
            `Photo ID returned from server ${photoToRemove} does not match photo.id ${photo.id}`
          );
        }
        const existingPhotos = existing.shoppingBagItems?.photoList || [];

        cache.writeQuery({
          query: ShoppingBagItemsDocument,
          data: {
            shoppingBagItems: {
              __typename: "ShoppingBagItemsResponse",
              photoList: existingPhotos.filter(rec => rec.id != photoToRemove)
            }
          }
        });
      }
    });
>>>>>>> Stashed changes
  };

  const sharePhotoOnTwitter = () => {
    if (!session) {
      router.push(`/auth/signin`);
    } else {
      console.log(`Share ${photo.id} on Twitter.`);
    }
  };

  const sharePhotoOnFacebook = () => {
    if (!session) {
      router.push(`/auth/signin`);
    } else {
      console.log(`Share ${photo.id} on Facebook.`);
    }
  };

  const sharePhotoViaEmail = () => {
    if (!session) {
      router.push(`/auth/signin`);
    } else {
      console.log(`Share ${photo.id} via email.`);
    }
  };

  const DDMenu = applyTheme(DropdownMenu, {
    Popover: {
      styles: {
        base: {
          altitude: 400
        }
      },
      modes: {
        dark: {
          styles: {
            base: {
              backgroundColor: "#2f3747"
            }
          }
        }
      }
    }
  });

  return (
    <DDMenu
      menu={
        <>
          <DropdownMenu.Item iconBefore="solid-info-circle" onClick={() => setShowInfo(true)}>
            <Text>Info</Text>
          </DropdownMenu.Item>
          <DropdownMenu.Item iconBefore="solid-expand">
            <Text>View Larger</Text>
          </DropdownMenu.Item>
<<<<<<< Updated upstream
          <DropdownMenu.Item iconBefore="solid-plus" onClick={() => addPhotoToFavorites()}>
            <Text>Favorites</Text>
          </DropdownMenu.Item>
          <DropdownMenu.Item iconBefore="solid-plus" onClick={() => addPhotoToShoppingBag()}>
            <Text>Shopping Bag</Text>
          </DropdownMenu.Item>
=======
          {inFavorites(photo.id) ? (
            <DropdownMenu.Item iconBefore="solid-minus" onClick={() => removePhotoFromFavorites()}>
              <Text>Remove from Favorites</Text>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item iconBefore="solid-plus" onClick={() => addPhotoToFavorites()}>
              <Text>Add to Favorites</Text>
            </DropdownMenu.Item>
          )}
          {inShoppingBag(photo.id) ? (
            <DropdownMenu.Item
              iconBefore="solid-minus"
              onClick={() => removePhotoFromShoppingBag()}
            >
              <Text>Remove from Shopping Bag</Text>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item iconBefore="solid-plus" onClick={() => addPhotoToShoppingBag()}>
              <Text>Add to Shopping Bag</Text>
            </DropdownMenu.Item>
          )}

>>>>>>> Stashed changes
          <DropdownMenu.Divider />
          <DropdownMenuGroup title="Share">
            <DropdownMenu.Item
              iconBefore="brands-twitter"
              color="#1da1f2"
              onClick={() => sharePhotoOnTwitter()}
            >
              <Text color="text">Twitter</Text>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              iconBefore="brands-facebook-f"
              color="#4267b2"
              onClick={() => sharePhotoOnFacebook()}
            >
              <Text color="text">Facebook</Text>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              iconBefore="solid-at"
              color="#4267b2"
              onClick={() => sharePhotoViaEmail()}
            >
              <Text color="text">Email</Text>
            </DropdownMenu.Item>
          </DropdownMenuGroup>
        </>
      }
    >
      <Button
        variant="ghost"
        marginTop={{ default: "major-1", "max-Tablet": "minor-1" }}
        marginX="major-1"
      >
        <Icon aria-label="options" icon="solid-ellipsis-v" fontSize="200" />
      </Button>
    </DDMenu>
  );
};

export default SlideMenu;
