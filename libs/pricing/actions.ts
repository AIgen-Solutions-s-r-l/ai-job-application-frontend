"use server";

import { ResponseActionType } from "@/types";
import { createClient } from "../supabase/server";
import Stripe from "stripe";

const supabase = createClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16", // TODO: update this when Stripe updates their API
  typescript: true,
});

export async function checkoutPlan(
  planId: string,
  retrunUrl: string
): Promise<ResponseActionType> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from(`profiles`)
    .select("*")
    .eq(`id`, user.id)
    .single();

  let customerId = userData.customer_id;
  if (!customerId) {
    const newCustomer = await stripe.customers.create({
      name: userData.full_name,
      email: userData.email,
    });

    customerId = newCustomer.id;
    await supabase
      .from(`profiles`)
      .update({ customer_id: customerId })
      .eq(`id`, user.id);
  }

  const { data: selectedPlan } = await supabase
    .from(`subscription_plans`)
    .select(`id, plan_name, price`)
    .eq(`id`, planId)
    .single();

  const product = await stripe.products.create({
    name: selectedPlan.plan_name,
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: Math.round(selectedPlan.price * 100),
    currency: "usd",
  });

  if (selectedPlan.price > 0) {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        mode: "payment",
        client_reference_id: user.id,
        customer: customerId,
        metadata: {
          planId,
        },
        success_url: `${retrunUrl}?payment=success`,
        cancel_url: `${retrunUrl}?payment=fail`,
      });

      return {
        success: true,
        data: session.url,
      };
    } catch (error) {
      console.log("here", error);
      return { success: false, error };
    }
  } else {
    await supabase.from(`profiles`).update({ plan: planId }).eq("id", user.id);
  }

  return {
    success: true,
  };
}
