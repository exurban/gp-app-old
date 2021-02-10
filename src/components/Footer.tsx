import { Box, Divider, Hide, Grid } from "bumbag";
import FooterItem from "./FooterItem";

const Footer: React.FC = () => {
  // const subscribeToNewsletter = () => {
  //   console.log(`subscribing to newsletter.`);
  // };

  return (
    <>
      <Divider borderWidth="2px" borderColor="primary" />
      <Box
        className="footer"
        backgroundColor="black200"
        color="white900"
        alignX="center"
        paddingY="40px"
      >
        <Hide above="desktop">
          <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "1rem" }}>
            <Box gridColumn="1 / span 2" alignX="center">
              <FooterItem text={"© 2020 Gibbs Photography, LLC"} />
            </Box>
            <FooterItem text={"Privacy Policy"} link={"/legal/privacy-policy"} />
            // TODO: Toast if signed in or send to sign in page
            <FooterItem text={"Subscribe to Newsletter"} />
            <FooterItem text={"Terms of Service"} link={"/legal/terms-of-service"} />
            <FooterItem text={"Contact Us"} link={"mailto: info@gibbs-photography.com"} />
            <Box gridColumn="1 / span 2" alignX="center">
              <FooterItem text={"Built by (ex)urban"} link={"https://exurban.io"} />
            </Box>
          </Box>
        </Hide>
        <Hide below="desktop">
          <Grid templateColumns="repeat(4, 1fr)" columnGap="1rem" justifyContent="space-between">
            <Box marginRight="20px">
              <FooterItem text={"© 2020 Gibbs Photography, LLC"} />
            </Box>
            <FooterItem text={"Privacy Policy"} link={"/legal/privacy-policy"} />
            <FooterItem text={"Subscribe to Newsletter"} />
            <FooterItem text={"Built by (ex)urban"} link={"https://exurban.io"} />
            <FooterItem text={""} link={""} />
            <FooterItem text={"Terms of Service"} link={"/legal/terms-of-service"} />
            <FooterItem text={"Contact Us"} link={"mailto: info@gibbs-photography.com"} />
          </Grid>
        </Hide>
      </Box>
    </>
  );
};

export default Footer;
