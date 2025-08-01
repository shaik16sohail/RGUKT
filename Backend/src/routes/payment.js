const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const tempFormData = require('../utils/tempFormData');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);



router.post('/create-checkout-session', async (req, res) => {
  const { formData,userId } = req.body;
  console.log("in session checkout",userId);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Emergency Outpass Fee',
            },
            unit_amount: 500, // in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://staymaster-xi.vercel.app/success',
      cancel_url: 'https://staymaster-xi.vercel.app/cancel',
      metadata: {
        userId,
        studentMobile: formData.studentMobile,
      },
    });
    tempFormData[session.id]=formData;
    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
