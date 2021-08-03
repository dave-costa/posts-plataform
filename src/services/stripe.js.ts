import { loadStripe } from '@stripe/stripe-js'

export async function getStripeJs() {
    const stripeJs =  await loadStripe('pk_test_51JI1UdAPYFSejF2xihJRdumKujyJUiQyVbjLZUIQqhFcYVVyuu3O4tjn83xUZxs8QR5m9DELBimcJ0VosWzXrxkj008vfZFb4G')
    return stripeJs
}