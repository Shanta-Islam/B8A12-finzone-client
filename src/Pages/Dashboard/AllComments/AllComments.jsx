import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link, useLoaderData } from "react-router-dom";
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import { Button, Grid, MenuItem, Select, Typography } from "@mui/material";
// import { ArrowBack, ArrowForward } from "@mui/icons-material";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//         backgroundColor: theme.palette.common.white,
//         color: theme.palette.common.black,
//     },
//     [`&.${tableCellClasses.body}`]: {
//         fontSize: 14,
//     },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     '&:last-child td, &:last-child th': {
//         border: 0,
//     },
// }));

const AllComments = () => {
    const comment = useLoaderData();
    console.log(comment);
    // const axiosSecure = useAxiosSecure();
    // const [comments, setComments] = useState([]);
    // const [currentPage, setCurrentPage] = useState(0);
    // const [count, setCount] = useState(0);
    // const [itemPerPage, SetItemPerPage] = useState(10);
    // const numsOfPage = Math.ceil(count / itemPerPage);
    // const pages = [];
    // for (let i = 0; i < numsOfPage; i++) {
    //     pages.push(i);
    // }
    // useEffect(() => {
    //     axiosSecure.get(`/postComments/${comment?.postId}`)
    //         .then(res => {
    //             setComments(res.data)
    //         })
    // }, [axiosSecure, comment?.postId])
    // // useEffect(() => {
    // //     fetch(`https://finzone-server.vercel.app/postsCount/${user?.email}`)
    // //         .then(res => res.json())
    // //         .then(data => {
    // //             setCount(data.count)

    // //         })
    // // }, [])
    // const handlePrevPage = () => {
    //     if (currentPage > 0) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // }
    // const handleNextPage = () => {
    //     if (currentPage < pages.length - 1) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // }
    return (
        // <Grid>
        //     <Typography variant="h4" sx={{ textAlign: 'center' }}>All Comments</Typography>
        //     <TableContainer component='main' container sx={{ padding: '30px 50px' }}>
        //         <Table sx={{ minWidth: 700 }} aria-label="customized table">
        //             <TableHead>
        //                 <TableRow>
        //                     <StyledTableCell></StyledTableCell>
        //                     <StyledTableCell>Commenter Email</StyledTableCell>
        //                     <StyledTableCell>Comment</StyledTableCell>
        //                     <StyledTableCell>FeedBack</StyledTableCell>
        //                     <StyledTableCell>Action</StyledTableCell>
        //                 </TableRow>
        //             </TableHead>
        //             <TableBody>
        //                 {comments.map((comment, index) => (
        //                     <StyledTableRow key={comment._id}>
        //                         <StyledTableCell component="th" scope="row">
        //                             {index + 1}
        //                         </StyledTableCell>
        //                         <StyledTableCell>{comment?.email}</StyledTableCell>
        //                         <StyledTableCell>{comment?.data.comment}</StyledTableCell>
        //                         <StyledTableCell>
        //                             <Select
        //                                 label="tag"
        //                                 variant="outlined"
        //                                 fullWidth
        //                                 margin="normal"
        //                             >
        //                                 {/* {
        //                                     tags?.map(tag => )
        //                                 } */}
        //                                 <MenuItem value="20%">20%</MenuItem>
        //                                 <MenuItem value="50%">50%</MenuItem>
        //                                 <MenuItem value="80%">80%</MenuItem>
        //                                 <MenuItem value="100%">100%</MenuItem>
        //                             </Select>
        //                         </StyledTableCell>
        //                         <StyledTableCell>
        //                             <Link to={`/dashboard/postComments`} style={{ textDecoration: 'none' }}>
        //                                 <Button variant='contained' sx={{ backgroundColor: '#06BD95' }}>Report</Button>
        //                             </Link>
        //                             {/* <Button variant='contained' sx={{ backgroundColor: 'red', marginLeft: '10px' }} onClick={() => handleDelete(post._id)}>Delete</Button> */}
        //                         </StyledTableCell>
        //                     </StyledTableRow>
        //                 ))}
        //             </TableBody>
        //         </Table>
        //     </TableContainer>
        //     {!comments.length ?
        //         "No Post Found"
        //         :
        //         <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //             <Grid>
        //                 <Typography>
        //                     {itemPerPage == 10 ? `Showing 0 to ${count} of ${count}` : `Showing 0 to ${itemPerPage} of ${count}`}
        //                 </Typography>
        //             </Grid>
        //             <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
        //                 <Button variant="contained" sx={{ backgroundColor: '#06BD95' }} onClick={handlePrevPage}><ArrowBack></ArrowBack></Button>
        //                 {
        //                     pages.map(page => <Button onClick={() => setCurrentPage(page)} key={page}>{page}</Button>)
        //                 }
        //                 <Button variant="contained" sx={{ backgroundColor: '#06BD95' }} onClick={handleNextPage}><ArrowForward></ArrowForward></Button>

        //             </Grid>
        //         </Grid>
        //     }


        // </Grid>
        <div>
            
        </div>
    );
};

export default AllComments;