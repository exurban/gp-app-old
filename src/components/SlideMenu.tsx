import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import { DropdownMenu, Icon, Button, applyTheme, useToasts, useBreakpointValue } from "bumbag";
import {
  FavoritesDocument,
  AddPhotoToFavoritesDocument,
  RemovePhotoFromFavoritesDocument,
  PhotoInfoFragment,
  ShoppingBagItemsDocument
} from "../graphql-operations";

type Props = {
  photo: PhotoInfoFragment;
};

const SlideMenu: React.FC<Props> = ({ photo }) => {
  const [session] = useSession();
  const router = useRouter();
  const toasts = useToasts();
  const [addToFavorites] = useMutation(AddPhotoToFavoritesDocument);
  const [removeFromFavorites] = useMutation(RemovePhotoFromFavoritesDocument);

  const signinFirst = () => {
    localStorage.setItem("redirectUrl", router.pathname);
    localStorage.setItem("favPhoto", photo.id);
    router.push("/auth/signin");
  };

  const showInfo = () => {
    router.push(`/image/${photo.sku}`);
  };

  const showInCarousel = () => {
    let { pathname } = router;

    if (!pathname || typeof pathname !== "string") {
      return;
    }

    if (pathname.includes(`gallery`)) {
      pathname = pathname.replace(`gallery`, `carousel`);
    }

    if (pathname.includes(`/[name]`)) {
      pathname = pathname.replace(`/[name]`, "");
      const { name } = router.query;

      router.push({
        pathname: `${pathname}/${name}`,
        query: { sku: photo?.sku }
      });
    } else {
      router.push({
        pathname: `${pathname}/`,
        query: { sku: photo?.sku }
      });
    }
  };

  const addPhotoToFavorites = () => {
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
    removeFromFavorites({
      variables: { photoId: parseInt(photo.id) },
      update: (cache, { data: { ...removePhotoResponse } }) => {
        const { ...existing } = cache.readQuery({
          query: FavoritesDocument
        });
        const photoToRemove = removePhotoResponse.removePhotoFromFavorites.removedPhotoWithId;
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
  };

  const addToShoppingBag = () => {
    router.push(`/shop/options/${photo.sku}`);
  };

  const viewInShoppingBag = () => {
    router.push(`/shop/review-order`);
  };

  const { data: favs } = useQuery(FavoritesDocument);
  const inFavorites = useMemo(() => {
    const favIds = favs?.favorites?.photoList?.map(f => f.id);
    return favIds ? favIds.includes(photo.id) : false;
  }, [favs]);

  const { data: bagItems } = useQuery(ShoppingBagItemsDocument);
  const inShoppingBag = useMemo(() => {
    const bagItemIds = bagItems?.shoppingBagItems?.dataList?.map(b => b.photo.id);
    return bagItemIds ? bagItemIds.includes(photo.id) : false;
  }, [bagItems]);

  const size = useBreakpointValue({
    default: "default",
    "max-tablet": "small"
  });

  const spacing = useBreakpointValue({
    default: "major-1",
    "max-tablet": "minor-1"
  });

  const DDMenu = applyTheme(DropdownMenu, {
    Popover: {
      styles: {
        base: {
          altitude: 400,
          animated: 20,
          transition: "none"
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

  // if (typeof window === undefined) {
  //   return <p>waiting</p>;
  // }

  return (
    <>
      <DDMenu
        transition="none"
        menu={
          <>
            <DropdownMenu.Item iconBefore="solid-info-circle" onClick={() => showInfo()}>
              Info
            </DropdownMenu.Item>
            <DropdownMenu.Item iconBefore="solid-expand" onClick={() => showInCarousel()}>
              View Larger
            </DropdownMenu.Item>
            {inFavorites ? (
              <DropdownMenu.Item
                iconBefore="solid-minus"
                onClick={() => removePhotoFromFavorites()}
              >
                Remove from Favorites
              </DropdownMenu.Item>
            ) : (
              <DropdownMenu.Item iconBefore="solid-plus" onClick={() => addPhotoToFavorites()}>
                Add to Favorites
              </DropdownMenu.Item>
            )}
            {inShoppingBag ? (
              <DropdownMenu.Item iconBefore="solid-minus" onClick={() => viewInShoppingBag()}>
                View in Shopping Bag
              </DropdownMenu.Item>
            ) : (
              <DropdownMenu.Item iconBefore="solid-plus" onClick={() => addToShoppingBag()}>
                Add to Shopping Bag
              </DropdownMenu.Item>
            )}
          </>
        }
      >
        <Button
          variant="ghost"
          fontSize={{ default: "500", "max-tablet": "200" }}
          size={size}
          margin={spacing}
          padding={spacing}
          transition="none"
          _focus={{ boxShadow: "none" }}
        >
          <Icon aria-label="options" icon="solid-ellipsis-v" fontSize="200" />
        </Button>
      </DDMenu>
    </>
  );
};

export default SlideMenu;
