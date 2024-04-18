<script setup>
// This is your test publishable API key.
const stripe = Stripe("pk_test_51P2Ft1Il3KrPbToQOEevkgDgeA9pQ9BjTcPhu3j4Do9mbJ4q6x2ErdbGvJUO9G7H0R8ew27NgGQtg39TYtfh3LFW0005ftPKBC");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}
</script>

<template>
    <title>Accept a payment</title>
    <body>
        <!-- Display a payment form -->
        <div id="checkout">
         <!-- Checkout will insert the payment form here -->
        </div>
    </body>
</template>