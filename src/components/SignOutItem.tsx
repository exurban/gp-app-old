import { Flex, Icon, Text } from "bumbag";
import { signOut } from "next-auth/client";
import React from "react";

type Props = {
  size: string;
};

const AccountItem: React.FC<Props> = ({ size }) => {
  return (
    <Flex
      flexDirection="column"
      className="right-nav-item"
      marginBottom={size === "large" ? "major-1" : "0px"}
      height="100%"
      justifyContent={size === "small" ? "center" : "flex-end"}
      paddingX={size === "small" ? "major-1" : "0px"}
      onClick={e => {
        e.preventDefault();
        signOut();
        localStorage.removeItem("lastUrl");
        localStorage.removeItem("cursor");
      }}
    >
      <Icon aria-label="sign out" icon="regular-user-circle" margin="0 auto" fontSize="1.25rem" />
      {size === "large" && (
        <Text marginTop="minor-1" fontSize="0.875rem" fontWeight="200" marginX="auto">
          Sign out
        </Text>
      )}
    </Flex>
  );
};

export default AccountItem;
