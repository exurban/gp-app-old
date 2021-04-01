import { NextApiRequest, NextApiResponse } from "next";
import { ProductInfoFragment } from "../../../graphql-operations";

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
// import { validateCartItems } from "use-shopping-cart/src/serverUtil";
// import inventory from "../../../data/products.json";

import Stripe from "stripe";
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27"
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Validate the cart details that were sent from the client.
      const products = req.body;

      // * fetch products from API and compare by filtering on matches

      // * create an order once payment has been processed
      // const taxRate = await stripe.taxRates.retrieve(
      //   'txr_1Ib8rUHWmZoCYYQSOyRPfJgi'
      // );
      // const line_items = validateCartItems(inventory, cartItems);
      const prod = products[0];
      console.log(JSON.stringify(prod, null, 2));
      console.log(`product summary: ${prod.productSummary}`);
      console.log(`image: ${prod.photo.images[0].imageUrl}`);
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: ["US", "CA"]
        },
        line_items: products.map((product: ProductInfoFragment) => ({
          price_data: {
            currency: "USD",
            product_data: {
              name: product.photo.title,
              description: product.productSummary,
              images: [product.photo.emailSharingImage?.imageUrl],
              metadata: {
                product: product.productSummary,
                photo: product.photo.sku,
                print: product.print.printSku,
                mat: product.mat?.matSku,
                frame: product.frame?.frameSku
              }
            },
            unit_amount: product.totalRetailPrice * 100
          },
          quantity: 1
          // tax_rates: [`txr_1Ib8rUHWmZoCYYQSOyRPfJgi`]
        })),
        mode: "payment",
        success_url: `${req.headers.origin}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`
        // success_url: `http://localhost:3000/checkout/success`,
        // cancel_url: `http://localhost:3000/checkout/cancel`
      };
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      );

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
