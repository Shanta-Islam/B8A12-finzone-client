
import { useEffect, useState } from "react"; 
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../Context/AuthProvider';

export const usePaymentUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        axiosSecure.patch(`/payment/${user?.email}`)
            .then(res => setPayments(res.data))
    }, [axiosSecure, user?.email])
    return payments;
};
