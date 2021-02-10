import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { useSession } from "next-auth/client";
import { DropdownMenu, DropdownMenuGroup, Text, Icon, Button, applyTheme, useToasts } from "bumbag";
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
  setShowInfo: Dispatch<SetStateAction<boolean>>;
  photo: PhotoInfoFragment;
};

const SlideMenu: React.FC<Props> = ({ setShowInfo, photo }) => {
  const [session] = useSession();
  const router = useRouter();
  const client = useApolloClient();
  const toasts = useToasts();
  const [addToFavorites] = useMutation(AddPhotoToFavoritesDocument);
  const [removeFromFavorites] = useMutation(RemovePhotoFromFavoritesDocument);
  const [addToShoppingBag] = useMutation(AddPhotoToShoppingBagDocument);
  const [removeFromShoppingBag] = useMutation(RemovePhotoFromShoppingBagDocument);

  const signinFirst = () => {
    localStorage.setItem("lastUrl", router.pathname);
    localStorage.setItem("favPhoto", photo.id);
    router.push("/auth/signin");
  };

  // TODO: this should load the image in the carousel
  const showLarger = () => {
    router.push(`/image/${photo.sku}`);
  };

  const addPhotoToFavorites = () => {
    console.log(`adding to favorites.`);
    if (!session) {
      signinFirst();
      return;
    }

    let success;
    let msg;

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
      update: (cache, { data: { ...newPhotoResponse } }) => {
        const { ...existing } = cache.readQuery({
          query: FavoritesDocument
        });

        const response = newPhotoResponse.addPhotoToFavorites;
        success = response.success;
        msg = response.message;

        const existingPhotos = existing.favorites?.photoList || [];

        cache.writeQuery({
          query: FavoritesDocument,
          data: {
            favorites: {
              __typename: "FavoritesResponse",
              photoList: photo ? [photo, ...existingPhotos] : [...existingPhotos]
            }
          }
        });
      }
    });
    {
      success
        ? toasts.success({
            title: "Added",
            message: msg
          })
        : toasts.warning({
            title: "Failed to add.",
            message: msg
          });
    }
  };

  const removePhotoFromFavorites = () => {
    console.log(`removing from favorites.`);
    if (!session) {
      signinFirst();
      return;
    }

    let success;
    let msg;

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

        const response = removePhotoResponse.removePhotoFromFavorites;
        const idOfPhotoToRemove = response.removedPhotoWithId;
        success = response.success;
        msg = response.message;

        const existingPhotos = existing.favorites?.photoList || [];

        cache.writeQuery({
          query: FavoritesDocument,
          data: {
            favorites: {
              __typename: "FavoritesResponse",
              photoList: existingPhotos.filter(rec => rec.id != idOfPhotoToRemove)
            }
          }
        });
      }
    });
    {
      success
        ? toasts.success({
            title: "Removed",
            message: msg
          })
        : toasts.warning({
            title: "Failed to remove.",
            message: msg
          });
    }
  };

  const addPhotoToShoppingBag = () => {
    if (!session) {
      signinFirst();
    }

    let success;
    let msg;

    addToShoppingBag({
      variables: { photoId: parseInt(photo.id) },
      optimisticResponse: {
        __typename: "Mutation",
        addPhotoToShoppingBag: {
          success: true,
          message: `Successfully added ${photo.title} to your shopping bag.`,
          addedPhotoWithId: photo.id,
          __typename: "AddPhotoToShoppingBagResponse"
        }
      },
      update: (cache, { data: { ...newBagItemResponse } }) => {
        const { ...existing } = cache.readQuery({
          query: ShoppingBagItemsDocument
        });

        const response = newBagItemResponse.addPhotoToShoppingBag;
        const newPhotoId = response.addedPhotoWithId;
        success = response.success;
        msg = response.message;

        if (newPhotoId != photo.id) {
          console.log(
            `Incoming response from server with id ${newPhotoId} does not match added photo id ${photo.id}`
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
    {
      success
        ? toasts.success({
            title: "Added",
            message: msg
          })
        : toasts.warning({
            title: "Failed to add.",
            message: msg
          });
    }
  };

  const removePhotoFromShoppingBag = () => {
    if (!session) {
      signinFirst();
      return;
    }

    let success;
    let msg;

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

        const response = removePhotoResponse.removePhotoFromShoppingBag;
        const idOfPhotoToRemove = response.removedPhotoWithId;
        success = response.success;
        msg = response.message;

        if (idOfPhotoToRemove != photo.id) {
          console.log(
            `ID of photo to remove incoming from server ${idOfPhotoToRemove} does not match ID of photo to remove ${photo.id}`
          );
        }

        const existingPhotos = existing.shoppingBagItems?.photoList || [];

        cache.writeQuery({
          query: ShoppingBagItemsDocument,
          data: {
            shoppingBagItems: {
              __typename: "ShoppingBagItemsResponse",
              photoList: existingPhotos.filter(rec => rec.id != idOfPhotoToRemove)
            }
          }
        });
      }
    });
    {
      success
        ? toasts.success({
            title: "Removed",
            message: msg
          })
        : toasts.warning({
            title: "Failed to remove.",
            message: msg
          });
    }
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
    if (!session) {
      return false;
    }

    // during development, could get in a situation where there was a session, but favorites hadn't been queried (session persisted when restarting server but favorites (cached on sign in) were purged). Instead of checking for this situation which should only occur in testing, Apollo 3.3 and up returns null if fields were missing
    const { ...favs } = client.cache.readQuery({
      query: FavoritesDocument
    });

    if (!favs) {
      console.error(`There IS a session, but favorites have not been fetched.`);
      useQuery(FavoritesDocument);
    }

    const photoList = favs.favorites?.photoList || [];

    if (!photoList) {
      return false;
    }
    const favIds = photoList.map(f => f.id);

    return favIds.includes(id);
  };

  const inShoppingBag = (id: string): boolean => {
    if (!session) {
      return false;
    }
    const { ...bagItems } = client.cache.readQuery({
      query: ShoppingBagItemsDocument
    });

    if (!bagItems) {
      useQuery(ShoppingBagItemsDocument);
    }

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
          <DropdownMenu.Item iconBefore="solid-expand" onClick={() => showLarger()}>
            <Text>View Larger</Text>
          </DropdownMenu.Item>
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
        margin={{ default: "major-1", "max-Tablet": "minor-1" }}
        // marginX="major-1"
      >
        <Icon aria-label="options" icon="solid-ellipsis-v" fontSize="200" />
      </Button>
    </DDMenu>
  );
};

export default SlideMenu;
