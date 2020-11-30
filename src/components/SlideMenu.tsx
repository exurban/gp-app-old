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
        });
      }
    }
  };

  const addPhotoToShoppingBag = () => {
    if (!session) {
      router.push(`/auth/signin`);
    } else {
      console.log(`Add ${photo.id} to shopping bag.`);
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
          <DropdownMenu.Item iconBefore="solid-plus" onClick={() => addPhotoToFavorites()}>
            <Text>Favorites</Text>
          </DropdownMenu.Item>
          <DropdownMenu.Item iconBefore="solid-plus" onClick={() => addPhotoToShoppingBag()}>
            <Text>Shopping Bag</Text>
          </DropdownMenu.Item>
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
