/**
 * Back to Gallery "G"
 * Info "I"
 * Next "->"
 * Previous "<-"
 * Add to Favorites "F"
 * Add to Bag "B"
 * Share (bring up share modal)
 */
import { useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { DropdownMenu, Text, Icon, Button, applyTheme, useToasts } from "bumbag";
import {
  FavoritesDocument,
  AddPhotoToFavoritesDocument,
  RemovePhotoFromFavoritesDocument,
  PhotoInfoFragment,
  ShoppingBagItemsDocument,
  AddPhotoToShoppingBagDocument,
  RemovePhotoFromShoppingBagDocument
} from "../graphql-operations";
import CarouselInfoModal from "./CarouselInfoModal";

const MenuButton = applyTheme(Button, {
  defaultProps: {
    variant: "ghost",
    background: "rgba(27, 26, 28, 0.7)",
    color: "#babbba",
    position: "absolute",
    top: "6px",
    right: "6px",
    zIndex: "10",
    _hover: {
      color: "white"
    },
    _focus: {
      boxShadow: "none"
    }
  }
});

const DDMenu = applyTheme(DropdownMenu, {
  Popover: {
    styles: {
      base: {
        altitude: 400,
        color: "#babbba",
        backgroundColor: "#2f2e30"
      }
    }
  },
  Item: {
    styles: {
      base: {
        color: "#babbba",
        backgroundColor: "2f2e30",
        ":not(:disabled):hover": {
          backgroundColor: "#434244",
          color: "white"
        }
      }
    }
  }
});

type Props = {
  photo: PhotoInfoFragment;
};

const CarouselMenu: React.FC<Props> = ({ photo }) => {
  const [session] = useSession();
  const router = useRouter();
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

  const backToGallery = () => {
    let { pathname } = router;
    console.log(pathname);
    if (!pathname || typeof pathname !== "string") {
      return;
    }

    if (pathname.includes(`carousel`)) {
      pathname = pathname.replace(`carousel`, `gallery`);
    }

    console.log(pathname);

    if (pathname.includes(`/[name]`)) {
      pathname = pathname.replace(`/[name]`, "");
      const { name } = router.query;

      router.push({
        pathname: `${pathname}/${name}`
      });
    } else {
      router.push({
        pathname: `${pathname}/`
      });
    }
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

  const { data: favs } = useQuery(FavoritesDocument);
  const inFavorites = useMemo(() => {
    const favIds = favs?.favorites?.photoList?.map(f => f.id);
    return favIds ? favIds.includes(photo.id) : false;
  }, [favs]);

  const { data: bagItems } = useQuery(ShoppingBagItemsDocument);
  const inShoppingBag = useMemo(() => {
    const bagItemIds = bagItems?.shoppingBagItems?.photoList?.map(b => b.id);
    return bagItemIds ? bagItemIds.includes(photo.id) : false;
  }, [bagItems]);

  if (typeof window === undefined) {
    return <p>waiting</p>;
  }

  return (
    <DDMenu
      menu={
        <>
          <DropdownMenu.Item iconBefore="solid-th" onClick={() => backToGallery()}>
            <Text>Gallery</Text>
          </DropdownMenu.Item>

          <CarouselInfoModal photo={photo} />

          {inFavorites ? (
            <DropdownMenu.Item iconBefore="solid-minus" onClick={() => removePhotoFromFavorites()}>
              <Text>Remove from Favorites</Text>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item iconBefore="solid-plus" onClick={() => addPhotoToFavorites()}>
              <Text>Add to Favorites</Text>
            </DropdownMenu.Item>
          )}
          {inShoppingBag ? (
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
        </>
      }
    >
      <MenuButton>
        <Icon aria-label="options" icon="solid-ellipsis-v" fontSize="200" />
      </MenuButton>
    </DDMenu>
  );
};

export default CarouselMenu;
