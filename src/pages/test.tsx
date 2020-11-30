import { Text, Box, useBreakpoint } from "bumbag";
import FooterItem from "../components/FooterItem";

const testPage: React.FC = () => {
  const isDesktopAndUnder = useBreakpoint("max-desktop");

  return (
    <Box width="100%" alignX="center">
      {isDesktopAndUnder ? <Text>Yes</Text> : <Text>No</Text>}
      {isDesktopAndUnder ? (
        <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "1rem" }}>
          <Box gridColumn="1 / span 2" alignX="center">
            <FooterItem text={"© 2020 Gibbs Photography, LLC"} link={""} />
          </Box>
          <FooterItem text={"Privacy Policy"} link={"/legal/privacy-policy"} />
          <FooterItem text={"Subscribe to Newsletter"} link={"/newsletter"} />
          <FooterItem text={"Terms of Service"} link={"/legal/terms-of-service"} />

          <FooterItem text={"Contact Us"} link={"/contact"} />
          <Box gridColumn="1 / span 2" alignX="center">
            <FooterItem text={"Built by (ex)urban"} link={"https://exurban.io"} />
          </Box>
        </Box>
      ) : (
        <Box style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", columnGap: "1rem" }}>
          <FooterItem text={"© 2020 Gibbs Photography, LLC"} link={""} />
          <FooterItem text={"Privacy Policy"} link={"/legal/privacy-policy"} />
          <FooterItem text={"Subscribe to Newsletter"} link={"/newsletter"} />
          <FooterItem text={"Built by (ex)urban"} link={"https://exurban.io"} />
          <FooterItem text={""} link={""} />
          <FooterItem text={"Terms of Service"} link={"/legal/terms-of-service"} />
          <FooterItem text={"Contact Us"} link={"/contact"} />
        </Box>
      )}
    </Box>
  );
};

export default testPage;
