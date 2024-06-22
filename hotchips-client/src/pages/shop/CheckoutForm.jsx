import React, { useEffect, useState } from "react";
import { PiCurrencyInrFill } from "react-icons/pi";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { FaPaypal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
const CheckoutForm = ({ price, cart }) => {
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate;
  const [cardError, setCardError] = useState("");
  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      return;
    }
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      // console.log(res.data);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded
      return;
    }
    // create card element
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error);
    } else {
      setCardError("Sucess");
      console.log("[PaymentMethod]", paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent.id);
      setCardError(`Your Transaction id is ${paymentIntent.id}`);
      //payements info data
      const paymentsInfo = {
        email: user.email,
        transactionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "Order Pending",
        itemName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
      };
      console.log(paymentsInfo);
      //
      axiosSecure.post("/payments", paymentsInfo).then((res) => {
        console.log(res.data);
        alert("Payment Successfull");
      });
    }
  };
  return (
    <div className="flex flex-col items-start justify-start gap-8 sm:flex-row">
      {/* left side */}
      <div className="w-full space-y-3 md:w-1/2">
        <h4 className="text-lg font-semibold"> Order Summery </h4>
        <p>
          Total Price: <PiCurrencyInrFill /> {price}
        </p>
        <p>No.Of.Items :{cart.length}</p>
      </div>
      {/* Right side
       */}
      <div className="w-full max-w-sm px-4 py-8 space-y-6 shadow-2xl md:w-1/2 card shrink-0 bg-base-100">
        <h4 className="text-lg font-semibold"> Payment process</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>
        {/* stripe form */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="w-full mt-5 text-white btn-primary btn btn-sm"
          >
            Pay
          </button>
        </form>
        {/* {cardError ? <p className="text-red">{cardError}</p> : ""} */}
        {/* Paypal  */}
        <div className="mt-5 text-center">
          <hr />
          <button
            type="submit"
            disabled={!stripe}
            className="mt-5 text-white bg-orange-500 btn btn-sm"
          >
            <FaPaypal /> Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
