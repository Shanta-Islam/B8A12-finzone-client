import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, CircularProgress } from "@mui/material";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const MyPosts = () => {
    const { user } = useContext(AuthContext);
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: posts = [], refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/${user?.email}`)
            return res.data
        }

    });
    const handleDelete = id => {
        axiosSecure.delete(`/post/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch();

                }
            })
    }

    // console.log(posts)
    return (
        <TableContainer component='main' container sx={{ padding: '30px 50px' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>Post Title</StyledTableCell>
                        <StyledTableCell>Number of votes</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((post, index) => (
                        <StyledTableRow key={post._id}>
                            <StyledTableCell component="th" scope="row">
                                {index + 1}
                            </StyledTableCell>
                            <StyledTableCell>{post?.data?.postTitle}</StyledTableCell>
                            <StyledTableCell>3</StyledTableCell>
                            <StyledTableCell><Button variant='contained'>Comment</Button><Button variant='contained' sx={{ backgroundColor: 'red', marginLeft: '10px' }} onClick={() => handleDelete(post._id)}>Delete</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MyPosts;