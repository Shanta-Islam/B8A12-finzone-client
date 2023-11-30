import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { CircularProgress } from "@mui/material";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CheckoutForm = ({ clientSecret }) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (!stripe) {
            return
        }
        if (!clientSecret) {
            return;
        }
        stripe.retrievePaymentIntent(clientSecret);

    }, [stripe, clientSecret]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const res = await axiosSecure.patch(`/payments/${user?.email}`);
                console.log('payment saved', res.data);
        
        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);
        await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${import.meta.env.VITE_Payment_Gateway_PK}`
            }
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit} style={{ padding: '80px' }}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type='submit'

                >
                    {isLoading ? <CircularProgress></CircularProgress> : "Pay Now"}

                </button>

            </form>
        </div>
    );
};

export default CheckoutForm;