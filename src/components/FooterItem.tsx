import Link from "next/link";
import { Text, Link as BBLink } from "bumbag";

type Props = {
  text: string;
  link?: string | undefined;
};

const FooterItem: React.FC<Props> = ({ text, link }) => {
  return (
    <>
      {link ? (
        <Link href={link} passHref={true}>
          <BBLink>
            <Text.Block marginBottom="major-2">
              <Text fontSize="150" color="gray100" _hover={{ color: "primary", cursor: "pointer" }}>
                {text}
              </Text>
            </Text.Block>
          </BBLink>
        </Link>
      ) : (
        <Text.Block marginBottom="major-2">
          <Text fontSize="150" color="gray100">
            {text}
          </Text>
        </Text.Block>
      )}
    </>
  );
};

export default FooterItem;
