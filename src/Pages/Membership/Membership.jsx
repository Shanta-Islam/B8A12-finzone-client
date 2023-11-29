import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm"


const PUBLIC_KEY = "pk_test_51NZYKwA1oIe9vUXdtOVrsTYie1OYFaz6Vqs0czJYSxf80RZklCjsophkfDyDDLD5KdaDa0gB7o5zdUJuceowaDQX00eK8PgtK7"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <CheckoutForm></CheckoutForm>
        </Elements>
    )
}