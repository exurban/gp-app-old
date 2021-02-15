import { Flex, Icon, Text } from "bumbag";
import React from "react";

type Props = {
  size: string;
};

const AccountItem: React.FC<Props> = ({ size }) => {
  return (
    <Flex
      className="right-nav-item"
      flexDirection="column"
      marginBottom={size === "large" ? "major-1" : "0px"}
      height="100%"
      justifyContent={size === "small" ? "center" : "flex-end"}
      paddingX={size === "small" ? "major-1" : "0px"}
    >
      <Icon aria-label="sign in" icon="regular-user-circle" margin="0 auto" fontSize="1.25rem" />
      {size === "large" && (
        <Text marginTop="minor-1" fontSize="0.875rem" fontWeight="200" marginX="auto">
          Sign in
        </Text>
      )}
    </Flex>
  );
};

export default AccountItem;
