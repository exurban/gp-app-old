import Link from "next/link";
import { signOut, useSession } from "next-auth/client";
import { DropdownMenu, Divider, Link as BBLink, Text, Icon, Button } from "bumbag";

const ShoppingBagMenu: React.FC = () => {
  const [session] = useSession();
  return (
    <DropdownMenu
      zIndex="100"
      menu={
        <>
          {session ? (
            <>
              <Link href="/gallery/user/favorites" passHref={true}>
                <DropdownMenu.Item iconBefore="regular-star" color="primary">
                  <Text color="text">Favorites</Text>
                </DropdownMenu.Item>
              </Link>
              <Link href="/gallery/user/shopping-bag" passHref={true}>
                <DropdownMenu.Item iconBefore="solid-shopping-bag" color="primary">
                  <Text color="text">Shopping Bag</Text>
                </DropdownMenu.Item>
              </Link>
              <Divider />
              <DropdownMenu.Item
                iconBefore="regular-user-circle"
                color="primary"
                onClick={e => {
                  e.preventDefault();
                  signOut();
                  localStorage.removeItem("redirectUrl");
                  localStorage.removeItem("cursor");
                }}
              >
                <Text color="text">Sign out</Text>
              </DropdownMenu.Item>
            </>
          ) : (
            <Link href={`/auth/signin`} passHref={true}>
              <DropdownMenu.Item iconBefore="regular-user-circle">
                <BBLink>Sign in</BBLink>
              </DropdownMenu.Item>
            </Link>
          )}
        </>
      }
    >
      <Button variant="ghost">
        <Icon aria-label="Shopping Bag" icon="solid-shopping-bag" fontSize="300" />
      </Button>
    </DropdownMenu>
  );
};

export default ShoppingBagMenu;
