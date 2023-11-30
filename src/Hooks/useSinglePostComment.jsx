import { useEffect, useState } from "react";
import useAxiosSecure from './useAxiosSecure';
 
export const useSinglePostComment = (id, currentPage, itemPerPage) => {
    const axiosSecure = useAxiosSecure();
    const [comments, setComments] =useState([]);
    useEffect(()=>{
        axiosSecure(`http://localhost:5000/postComments/${id}?page=${currentPage}&size=${itemPerPage}`)
        .then(res=> setComments(res.data))
    },[axiosSecure, id, currentPage, itemPerPage])
    return comments;
};

export default useSinglePostComment;