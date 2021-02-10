import { Box, Stack, Heading, Paragraph, List, Link as BBLink } from "bumbag";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Box
      className="pageWrapper"
      paddingX="20px"
      width="90%"
      maxWidth="650px"
      marginX="auto"
      marginTop="30px"
      marginBottom="80px"
    >
      <Heading marginTop="40px" alignX="center">
        Gibbs Photography, LLC
      </Heading>
      <Heading use="h2" marginTop="30px" alignX="center">
        Privacy Policy
      </Heading>

      <Stack spacing="major-3" marginY="40px">
        <Paragraph>
          This Privacy Policy describes how your personal information is collected, used, and shared
          when you visit or make a purchase from{" "}
          <BBLink href="https://www.gibbs-photography.com">
            https://www.gibbs-photography.com
          </BBLink>{" "}
          (the <b>“Site”</b>
          ).
        </Paragraph>
        <Heading use="h5" marginTop="major-4" marginBottom="major-2">
          PERSONAL INFORMATION WE COLLECT
        </Heading>
        <Paragraph>
          When you visit the Site, we automatically collect certain information about your device,
          including information about your web browser, IP address, time zone, and some of the
          cookies that are installed on your device. Additionally, as you browse the Site, we
          collect information about the individual web pages or products that you view, what
          websites or search terms referred you to the Site, and information about how you interact
          with the Site. We refer to this automatically-collected information as “Device
          Information.”
        </Paragraph>
        <Paragraph>We collect Device Information using the following technologies:</Paragraph>
        <List listStyleType="disc" paddingX="major-4">
          <List.Item>
            <b>“Cookies”</b> are data files that are placed on your device or computer and often
            include an anonymous unique identifier. For more information about cookies, and how to
            disable cookies, visit{" "}
            <BBLink href="http://www.allaboutcookies.org">http://www.allaboutcookies.org </BBLink>.
          </List.Item>
          <List.Item>
            <b>“Log files”</b> track actions occurring on the Site, and collect data including your
            IP address, browser type, Internet service provider, referring/exit pages, and date/time
            stamps.
          </List.Item>
        </List>
        <Paragraph>
          Additionally when you make a purchase or attempt to make a purchase through the Site, we
          collect certain information from you, including your name, billing address, shipping
          address, payment information, email address, and phone number. We use{" "}
          <BBLink href="https://stripe.com">Stripe</BBLink> for payment processing and DO NOT
          collect or store credit card numbers (just card type and amount). We refer to this
          information as <b>“Order Information"</b>.
        </Paragraph>
        <Paragraph>
          When we talk about <b>“Personal Information”</b> in this Privacy Policy, we are talking
          both about Device Information and Order Information.
        </Paragraph>
        <Heading use="h5" marginTop="major-4" marginBottom="major-2">
          HOW DO WE USE YOUR PERSONAL INFORMATION?
        </Heading>
        <Paragraph>
          We use the Order Information that we collect generally to fulfill any orders placed
          through the Site (including processing your payment information, arranging for shipping,
          and providing you with invoices and/or order confirmations). Additionally, we use this
          Order Information to:
        </Paragraph>
        <List listStyleType="disc" paddingX="major-4">
          <List.Item>Communicate with you;</List.Item>
          <List.Item>Screen our orders for potential risk or fraud; and</List.Item>
          <List.Item>
            When in line with the preferences you have shared with us, provide you with information
            or advertising relating to our products or services.
          </List.Item>
        </List>
        <Paragraph>
          We use the Device Information that we collect to help us screen for potential risk and
          fraud (in particular, your IP address), and more generally to improve and optimize our
          Site (for example, by generating analytics about how our customers browse and interact
          with the Site, and to assess the success of our marketing and advertising campaigns).
        </Paragraph>
        <Heading use="h5" marginTop="major-4" marginBottom="major-2">
          SHARING YOUR PERSONAL INFORMATION
        </Heading>
        <Paragraph>
          We share your Personal Information with third parties to help us use your Personal
          Information, as described above. For example, we use Stripe to process payments in our
          online store--you can read more about how Stripe uses your Personal Information{" "}
          <BBLink href="https://www.stripe.com/legal/privacy">here</BBLink>. We also use Google
          Analytics to help us understand how our customers use the Site--you can read more about
          how Google uses your Personal Information{" "}
          <BBLink href="https://www.google.com/intl/en/policies/privacy/">here</BBLink>. You can
          also opt-out of Google Analytics{" "}
          <BBLink href="https://tools.google.com/dlpage/gaoptout">here</BBLink>.
        </Paragraph>
        <Paragraph>
          Finally, we may also share your Personal Information to comply with applicable laws and
          regulations, to respond to a subpoena, search warrant or other lawful request for
          information we receive, or to otherwise protect our rights.
        </Paragraph>

        <Heading use="h5" marginTop="major-4" marginBottom="major-2">
          BEHAVIOURAL ADVERTISING
        </Heading>
        <Paragraph>
          As described above, we use your Personal Information to provide you with targeted
          advertisements or marketing communications we believe may be of interest to you. For more
          information about how targeted advertising works, you can visit the Network Advertising
          Initiative’s (“NAI”){" "}
          <BBLink href="http://www.networkedadvertising.org/understanding-online-advertising/how-does-it-work">
            educational page
          </BBLink>
          .
        </Paragraph>
        <Paragraph>
          You can opt out of targeted advertising by visiting these links:
          <List listStyleType="disc" paddingX="major-4">
            <List.Item>
              <BBLink href="https://www.facebook.com/settings/?tab=ads">Facebook</BBLink>
              <List.Item>
                <BBLink href="https://www.google.com/settings/ads/anonymous">Google</BBLink>
              </List.Item>
              <List.Item>
                <BBLink href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads">
                  Bing
                </BBLink>
              </List.Item>
            </List.Item>
          </List>
        </Paragraph>
        <Heading use="h5" marginTop="major-4" marginBottom="major-2">
          DATA RETENTION
        </Heading>
        <Paragraph>
          When you place an order through the Site, we will maintain your Order Information for our
          records unless and until you ask us to delete this information.
        </Paragraph>
        <Heading use="h5" marginTop="major-4" marginBottom="major-2">
          CHANGES
        </Heading>
        <Paragraph>
          We may update this privacy policy from time to time in order to reflect, for example,
          changes to our practices or for other operational, legal or regulatory reasons.
        </Paragraph>
        <Heading use="h5" marginTop="major-4" marginBottom="major-2">
          CONTACT US
        </Heading>
        <Paragraph>
          For more information about our privacy practices, if you have questions, or if you would
          like to make a complaint, please contact us by e-mail at{" "}
          <BBLink href="mailto: info@gibbs-photography.com">info@gibbs-photography.com</BBLink>.
        </Paragraph>
      </Stack>
    </Box>
  );
};
export default PrivacyPolicyPage;
