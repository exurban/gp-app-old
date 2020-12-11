import { useRouter } from "next/router";
import { useMutation, useApolloClient } from "@apollo/client";
import { useSession } from "next-auth/client";
import { DropdownMenu, DropdownMenuGroup, Text, Icon, Button, applyTheme } from "bumbag";
import {
  FavoritesDocument,
  AddPhotoToFavoritesDocument,
  RemovePhotoFromFavoritesDocument,
  PhotoInfoFragment,
  ShoppingBagItemsDocument,
  AddPhotoToShoppingBagDocument,
  RemovePhotoFromShoppingBagDocument
} from "../graphql-operations";

type Props = {
  setShowInfo: any;
  photo: PhotoInfoFragment;
};

const SlideMenu: React.FC<Props> = ({ setShowInfo, photo }) => {
  const [session] = useSession();
  const router = useRouter();
  const client = useApolloClient();
  const [addToFavorites] = useMutation(AddPhotoToFavoritesDocument);
  const [removeFromFavorites] = useMutation(RemovePhotoFromFavoritesDocument);
  const [addToShoppingBag] = useMutation(AddPhotoToShoppingBagDocument);
  const [removeFromShoppingBag] = useMutation(RemovePhotoFromShoppingBagDocument);

  const signinFirst = () => {
    localStorage.setItem("lastUrl", router.pathname);
    localStorage.setItem("favPhoto", photo.id);
    router.push("/auth/signin");
  };

  const addPhotoToFavorites = () => {
    console.log(`adding to favorites.`);
    if (!session) {
      signinFirst();
      return;
    }

    // console.log(`determined there's a session.`);
    // toasts.success({
    //   title: "Successfully added",
    //   message: `Added ${photo.title} to your favorites.`
    // });
    addToFavorites({
      variables: { photoId: parseInt(photo.id) },
      update: (cache, { data: { ...newPhotoResponse } }) => {
        const { ...existing } = cache.readQuery({
          query: FavoritesDocument
        });

        const newPhoto = newPhotoResponse.addPhotoToFavorites.addedPhoto;
        // const result = newPhotoResponse.addPhotoToFavorites.success;
        // const msg = newPhotoResponse.addPhotoToFavorites.message;
        const existingPhotos = existing.favorites?.photoList || [];

        console.log(
          `Should be adding ${JSON.stringify(newPhotoResponse, null, 2)} to ${
            existingPhotos.length
          }`
        );

        cache.writeQuery({
          query: FavoritesDocument,
          data: {
            favorites: {
              __typename: "FavoritesResponse",
              photoList: newPhoto ? [newPhoto, ...existingPhotos] : [...existingPhotos]
            }
          }
        });
        console.log(`wrote to cache.`);
        // result
        //   ? toasts.success({
        //       title: "Successfully added",
        //       message: msg
        //     })
        //   : toasts.danger({
        //       title: "Failed to add",
        //       message: msg
        //     });
      }
    });
  };

  const removePhotoFromFavorites = () => {
    console.log(`removing from favorites.`);
    if (!session) {
      signinFirst();
      return;
    }
    removeFromFavorites({
      variables: { photoId: parseInt(photo.id) },
      update: (cache, { data: { ...removePhotoResponse } }) => {
        const { ...existing } = cache.readQuery({
          query: FavoritesDocument
        });
        const photoToRemove = removePhotoResponse.removePhotoFromFavorites.removedPhoto;
        const existingPhotos = existing.favorites?.photoList || [];

        cache.writeQuery({
          query: FavoritesDocument,
          data: {
            favorites: {
              __typename: "FavoritesResponse",
              photoList: existingPhotos.filter(rec => rec.id != photoToRemove?.id)
            }
          }
        });
      }
    });
  };

  const addPhotoToShoppingBag = () => {
    if (!session) {
      signinFirst();
    }
    addToShoppingBag({
      variables: { photoId: parseInt(photo.id) },
      update: (cache, { data: { ...newBagItemResponse } }) => {
        const { ...existing } = cache.readQuery({
          query: ShoppingBagItemsDocument
        });

        const newPhoto = newBagItemResponse.addPhotoToShoppingBag.addedPhoto;
        const existingPhotos = existing.shoppingBagItems?.photoList || [];

        cache.writeQuery({
          query: ShoppingBagItemsDocument,
          data: {
            shoppingBagItems: {
              __typename: "ShoppingBagItemsResponse",
              photoList: newPhoto ? [newPhoto, ...existingPhotos] : [...existingPhotos]
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
      update: (cache, { data: { ...removePhotoResponse } }) => {
        const { ...existing } = cache.readQuery({
          query: ShoppingBagItemsDocument
        });
        const photoToRemove = removePhotoResponse.removePhotoFromShoppingBag.removedPhoto;
        const existingPhotos = existing.shoppingBagItems?.photoList || [];

        cache.writeQuery({
          query: ShoppingBagItemsDocument,
          data: {
            shoppingBagItems: {
              __typename: "ShoppingBagItemsResponse",
              photoList: existingPhotos.filter(rec => rec.id != photoToRemove?.id)
            }
          }
        });
      }
    });
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

  const inFavorites = (id: string): boolean => {
    const { ...favs } = client.cache.readQuery({
      query: FavoritesDocument
    });

    const photoList = favs.favorites?.photoList || [];

    if (!photoList) {
      return false;
    }
    const favIds = photoList.map(f => f.id);

    return favIds.includes(id);
  };

  const inShoppingBag = (id: string): boolean => {
    const { ...bagItems } = client.cache.readQuery({
      query: ShoppingBagItemsDocument
    });

    const photoList = bagItems.shoppingBagItems?.photoList || [];

    const bagItemIds = photoList.map(f => f.id);

    return bagItemIds.includes(id);
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

  if (typeof window === undefined) {
    return <p>waiting</p>;
  }

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
          {inFavorites(photo.id) ? (
            <DropdownMenu.Item iconBefore="solid-minus" onClick={() => removePhotoFromFavorites()}>
              <Text>Favorites</Text>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item iconBefore="solid-plus" onClick={() => addPhotoToFavorites()}>
              <Text>Favorites</Text>
            </DropdownMenu.Item>
          )}
          {inShoppingBag(photo.id) ? (
            <DropdownMenu.Item
              iconBefore="solid-minus"
              onClick={() => removePhotoFromShoppingBag()}
            >
              <Text>Shopping Bag</Text>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item iconBefore="solid-plus" onClick={() => addPhotoToShoppingBag()}>
              <Text>Shopping Bag</Text>
            </DropdownMenu.Item>
          )}

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
