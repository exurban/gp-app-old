import { Flex, Icon, Text } from "bumbag";
import { signOut } from "next-auth/client";
import React from "react";

type Props = {
  size: string;
};

const AccountItem: React.FC<Props> = ({ size }) => {
  return (
    <Flex
      className="right-nav-item"
      flexDirection="column"
      marginBottom={size === "large" ? "minor-1" : "0px"}
      paddingTop="minor-1"
      paddingX={size === "small" ? "major-1" : "0px"}
      alignSelf={size === "large" ? "flex-end" : "center"}
      onClick={e => {
        e.preventDefault();
        signOut();
        localStorage.removeItem("lastUrl");
        localStorage.removeItem("cursor");
      }}
    >
      <Icon aria-label="sign out" icon="regular-user-circle" margin="0 auto" fontSize="1.25rem" />
      {size === "large" && (
        <Text
          marginTop="minor-1"
          fontSize="0.875rem"
          fontWeight="200"
          marginX="auto"
          textAlign="center"
        >
          Sign out
        </Text>
      )}
    </Flex>
  );
};

export default AccountItem;
