// StripeCheckoutButton.jsx
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51Rc7SJQCTC4QpOeVYRbj31bGolWggB61enyV996vA5mAsCQsseo2C62O6xoVUxLgdhNX3VF4MPQD7uQxGkIwU4Ot00cB4vcFNW');

const StripeCheckoutButton = () => {
  const handleClick = async () => {
    const stripe = await stripePromise;

    const { data } = await axios.post('http://localhost:8080/api/payment/create-checkout-session', {
      amount: 500, // in USD cents (i.e., $5.00)
    });

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded">
      Pay $5
    </button>
  );
};

export default StripeCheckoutButton;
