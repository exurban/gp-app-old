import React, { Dispatch, SetStateAction, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import {
  DropdownMenu,
  Text,
  Icon,
  Button,
  applyTheme,
  useToasts,
  useBreakpointValue
} from "bumbag";
import {
  FavoritesDocument,
  AddPhotoToFavoritesDocument,
  RemovePhotoFromFavoritesDocument,
  PhotoInfoFragment,
  ShoppingBagItemsDocument,
  AddPhotoToShoppingBagDocument,
  RemovePhotoFromShoppingBagDocument
} from "../graphql-operations";
import { TwitterShareButton } from "react-share";
import { NextSeo } from "next-seo";

type Props = {
  setShowInfo: Dispatch<SetStateAction<boolean>>;
  photo: PhotoInfoFragment;
};

const SlideMenu: React.FC<Props> = ({ setShowInfo, photo }) => {
  const [session] = useSession();
  const router = useRouter();
  const toasts = useToasts();
  const [addToFavorites] = useMutation(AddPhotoToFavoritesDocument);
  const [removeFromFavorites] = useMutation(RemovePhotoFromFavoritesDocument);
  const [addToShoppingBag] = useMutation(AddPhotoToShoppingBagDocument);
  const [removeFromShoppingBag] = useMutation(RemovePhotoFromShoppingBagDocument);

  const thisUrl = () => {
    const { pathname } = router;
    return `https://gibbs-photography.com${pathname}`;
  };

  const signinFirst = () => {
    localStorage.setItem("lastUrl", router.pathname);
    localStorage.setItem("favPhoto", photo.id);
    router.push("/auth/signin");
  };

  const showLarger = () => {
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
    removeFromShoppingBag({
      variables: { photoId: parseInt(photo.id) },
      update: (cache, { data: { ...removePhotoResponse } }) => {
        const { ...existing } = cache.readQuery({
          query: ShoppingBagItemsDocument
        });
        const photoToRemove = removePhotoResponse.removePhotoFromShoppingBag.removedPhotoWithId;
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
      <NextSeo
        title="Slide menu data"
        description="Slide menu description"
        openGraph={{
          images: [
            {
              url: `${photo.images?.[0].imageUrl}`
            }
          ]
        }}
      />
      <DDMenu
        transition="none"
        menu={
          <>
            <DropdownMenu.Item iconBefore="solid-info-circle" onClick={() => setShowInfo(true)}>
              Info
            </DropdownMenu.Item>
            <DropdownMenu.Item iconBefore="solid-expand" onClick={() => showLarger()}>
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
              <DropdownMenu.Item
                iconBefore="solid-minus"
                onClick={() => removePhotoFromShoppingBag()}
              >
                Remove from Shopping Bag
              </DropdownMenu.Item>
            ) : (
              <DropdownMenu.Item iconBefore="solid-plus" onClick={() => addPhotoToShoppingBag()}>
                Add to Shopping Bag
              </DropdownMenu.Item>
            )}
            <DropdownMenu.Divider />
            <DropdownMenu.Group title="Share">
              <TwitterShareButton
                url={thisUrl()}
                title={`${photo.title}\n`}
                hashtags={["photography", "nature"]}
              >
                <Text.Block>Twitter</Text.Block>
              </TwitterShareButton>
            </DropdownMenu.Group>
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
