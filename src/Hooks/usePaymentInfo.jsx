import axiosSecure from "*"


const createPaymentIntent = async(price)=>{
    const {data} = await axiosSecure.post('/create-payment-intent', price)
    return data;
}
export default createPaymentIntent;
