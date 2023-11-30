
import { useEffect, useState } from "react";
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../Context/AuthProvider';

export const useUserPosts = (currentPage, itemPerPage) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axiosSecure(`/posts/${user?.email}?page=${currentPage}&size=${itemPerPage}`)
            .then(res => setPosts(res.data))
    }, [axiosSecure, user?.email, currentPage, itemPerPage])
    return [posts, setPosts];
};

export default useUserPosts;