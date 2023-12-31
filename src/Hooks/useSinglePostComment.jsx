import { useEffect, useState } from "react";
import useAxiosSecure from './useAxiosSecure';
 
export const useSinglePostComment = (id, currentPage, itemPerPage) => {
    const axiosSecure = useAxiosSecure();
    const [comments, setComments] =useState([]);
    useEffect(()=>{
        axiosSecure(`https://finzone-server.vercel.app/postComments/${id}?page=${currentPage}&size=${itemPerPage}`)
        .then(res=> setComments(res.data))
    },[axiosSecure, id, currentPage, itemPerPage])
    return [comments,setComments];
};

export default useSinglePostComment;