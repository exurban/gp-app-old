import Link from "next/link";
import { signOut, useSession } from "next-auth/client";
import { DropdownMenu, DropdownMenuGroup, Divider, Flex, Text, Icon, Button } from "bumbag";

const ShoppingBagMenu: React.FC = () => {
  const [session] = useSession();
  return (
    <DropdownMenu
      menu={
        <>
          {session ? (
            <DropdownMenuGroup>
              <DropdownMenu.Item height="40px">
                <Flex direction="row" alignY="center" fontWeight="400">
                  <Icon icon="regular-star" color="primary" />
                  <Text color="text" marginLeft="major-1">
                    Favorites
                  </Text>
                  <Text marginLeft="auto" alignX="right" color="primary">
                    0
                  </Text>
                </Flex>
              </DropdownMenu.Item>
              <DropdownMenu.Item height="40px">
                <Flex direction="row" alignY="center" fontWeight="400">
                  <Icon icon="solid-shopping-bag" color="primary" />
                  <Text color="text" marginLeft="major-1">
                    Shopping Bag
                  </Text>
                  <Text marginLeft="auto" alignX="right" color="primary">
                    0
                  </Text>
                </Flex>
              </DropdownMenu.Item>
              <Divider />
              <DropdownMenu.Item iconBefore="regular-user-circle">
                <Text
                  onClick={e => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </Text>
              </DropdownMenu.Item>
            </DropdownMenuGroup>
          ) : (
            <DropdownMenu.Item iconBefore="regular-user-circle">
              <Link href={`/auth/signin`}>
                <a>Sign in</a>
              </Link>
            </DropdownMenu.Item>
          )}
        </>
      }
    >
      <Button variant="ghost">
        <Icon aria-label="Shopping Bag" icon="solid-shopping-bag" />
      </Button>
    </DropdownMenu>
  );
};

export default ShoppingBagMenu;
