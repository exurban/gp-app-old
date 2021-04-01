import { NextPage } from "next";
import { useRouter } from "next/router";

import { fetchGetJSON } from "../../utils/api-helpers";
import useSWR from "swr";
import PrintObject from "../../components/PrintObject";

import { Heading, Box, Text } from "bumbag";

const CheckoutResultPage: NextPage = () => {
  const router = useRouter();

  // fetch Checkout Session from static page via static generation
  const { data, error } = useSWR(
    router.query.session_id ? `/api/checkout_sessions/${router.query.session_id}` : null,
    fetchGetJSON
  );

  if (error) return <div>failed to load</div>;

  const name = data?.payment_intent.charges.data[0].billing_details.name;
  const paymentAmount = data?.payment_intent.charges.data[0].amount_captured / 100;
  const email = data?.payment_intent.charges.data[0].billing_details.email;

  return (
    <Box className="page-container" width="90%" maxWidth="800px" marginX="auto">
      <Heading use="h3" marginTop="major-4">
        Thanks for your order!
      </Heading>

      <Text.Block marginTop="major-5">
        {name}, your payment of ${paymentAmount} was processed successfully.
      </Text.Block>
      <Text.Block marginTop="major-3"> A receipt has been sent {email}.</Text.Block>
      <Text.Block marginTop="major-3">
        {" "}
        Your photo(s) are being lovingly created just for you, in accordance with your order. Please
        expect your order to arrive within 2-3 weeks. We hope you're delighted with your new
        photo(s) and we look forward to your next visit.
      </Text.Block>
    </Box>
  );
};

export default CheckoutResultPage;
