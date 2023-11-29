import { useEffect, useState } from "react";
import useAxiosPublic from './useAxiosPublic';

export const usePosts = (currentPage, itemPerPage) => {
    const axiosPublic = useAxiosPublic();
    const [posts, setPosts] =useState([]);
    useEffect(()=>{
        axiosPublic(`/posts?page=${currentPage}&size=${itemPerPage}`)
        .then(res=> setPosts(res.data))
    },[axiosPublic, currentPage, itemPerPage])
    return posts;
};

export default usePosts;