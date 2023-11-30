
// import { useEffect, useState } from "react";
// import useAxiosSecure from './useAxiosSecure';
 
// export const useSingleComment = (id) => {
//     const axiosSecure = useAxiosSecure();
//     const [comment, setComment] =useState([]);
//     useEffect(()=>{
//         axiosSecure(`https://finzone-server.vercel.app/comment/${id}`)
//         .then(res=> setComment(res.data))
//     },[axiosSecure, id,])
//     return [comment,setComment];
// };

// export default useSingleComment;