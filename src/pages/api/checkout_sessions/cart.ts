import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../graphql-operations";

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
      // const line_items = validateCartItems(inventory, cartItems);
      console.log({ products });
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: ["US", "CA"]
        },
        line_items: products.map((product: Product) => ({
          price_data: {
            currency: "USD",
            product_data: {
              name: product.photo.title,
              images: [product.photo.emailSharingImage?.imageUrl]
            },
            unit_amount: product.totalRetailPrice * 100
          },
          quantity: 1
        })),
        mode: "payment",
        // success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        // cancel_url: `${req.headers.origin}/use-shopping-cart`
        success_url: `http://localhost:3000/checkout/success`,
        cancel_url: `http://localhost:3000/checkout/cancel`
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
