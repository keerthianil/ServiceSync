import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your-publishable-key-here");

const PaymentPage: React.FC = () => {
  const { bookingId } = useParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      try {
        const response = await axios.post("/api/payments/create-session", {
          bookingId,
        });
        setSessionId(response.data.sessionId);
      } catch (error) {
        console.error("Error fetching checkout session", error);
      }
    };
    fetchCheckoutSession();
  }, [bookingId]);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    if (!stripe || !sessionId) return;

    const result = await stripe.redirectToCheckout({
      sessionId,
    });

    if (result.error) {
      console.error("Payment failed", result.error.message);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      {sessionId ? (
        <button onClick={handlePayment}>Proceed to Payment</button>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
};

export default PaymentPage;
