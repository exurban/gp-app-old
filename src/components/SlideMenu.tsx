import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import { DropdownMenu, DropdownMenuGroup, Text, Icon, Button } from "bumbag";
import { Photo, AddPhotoToFavoritesDocument } from "../typed-document-nodes";

type Props = {
  setShowInfo: any;
  photo: Photo;
};

const SlideMenu: React.FC<Props> = ({ setShowInfo, photo }) => {
  const [session] = useSession();
  const router = useRouter();
  const [addToFavorites, { data }] = useMutation(AddPhotoToFavoritesDocument);

  const addPhotoToFavorites = () => {
    console.log(`looking for session's api token`);
    if (session) {
      const token = session.user;
      console.log(
        `SESSION: ${JSON.stringify(session, null, 2)}\nAPI Token: ${JSON.stringify(
          session.accessToken,
          null,
          2
        )}`
      );
    }
    //   router.push(`/auth/signin`);
    // } else {
    //   console.log(`Add ${photo.id} to favorites.`);
    //   addToFavorites({ variables: { photoId: parseInt(photo.id) } });
    // }
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

  return (
    <DropdownMenu
      menu={
        <>
          <DropdownMenu.Item
            fontWeight="400"
            iconBefore="solid-info-circle"
            color="primary"
            onClick={() => setShowInfo(true)}
          >
            <Text color="text">Info</Text>
          </DropdownMenu.Item>
          <DropdownMenu.Item iconBefore="solid-expand" fontWeight="400" color="primary">
            <Text color="text">View Larger</Text>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            iconBefore="solid-plus"
            fontWeight="400"
            color="primary"
            onClick={() => addPhotoToFavorites()}
          >
            <Text color="text">Favorites</Text>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            iconBefore="solid-plus"
            fontWeight="400"
            color="primary"
            onClick={() => console.log(`${JSON.stringify(photo, null, 2)} `)}
          >
            <Text color="text">Shopping Bag</Text>
          </DropdownMenu.Item>
          <DropdownMenu.Divider />
          <DropdownMenuGroup title="Share">
            <DropdownMenu.Item
              iconBefore="brands-twitter"
              fontWeight="400"
              color="#1da1f2"
              onClick={() => sharePhotoOnTwitter()}
            >
              <Text color="text">Twitter</Text>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              iconBefore="brands-facebook-f"
              fontWeight="400"
              color="#4267b2"
              onClick={() => sharePhotoOnFacebook()}
            >
              <Text color="text">Facebook</Text>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Icon
                icon="brands-instagram"
                fontWeight="400"
                background="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)"
                color="#fff"
              />
              <Text color="text" fontWeight="400" marginLeft="major-1">
                Instagram
              </Text>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              iconBefore="solid-faAt"
              fontWeight="400"
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
        marginLeft="4px"
      >
        <Icon aria-label="options" icon="solid-ellipsis-v" fontSize="200" />
      </Button>
    </DropdownMenu>
  );
};

export default SlideMenu;
