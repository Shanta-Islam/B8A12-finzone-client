import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Grid, Typography } from "@mui/material";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { ArrowBack, ArrowForward } from "@mui/icons-material";


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
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(0);
    const [itemPerPage, SetItemPerPage] = useState(10);
    const numsOfPage = Math.ceil(count / itemPerPage);
    const pages = [];
    for (let i = 0; i < numsOfPage; i++) {
        pages.push(i);
    }
    const { data: posts = [], refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/${user?.email}?page=${currentPage}&size=${itemPerPage}`)
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

    useEffect(() => {
        fetch('http://localhost:5000/postsCount')
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
                refetch()
            })
    }, [refetch])
    // const handleItemPerPage = e => {
    //     const val = parseInt(e.target.value);
    //     SetItemPerPage(val);
    //     setCurrentPage(0);
    // }
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }
    // console.log(count)
    return (
        <Grid>
            <Typography variant="h4" sx={{textAlign:'center'}}>My Posts</Typography>
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
                                <StyledTableCell><Button variant='contained' sx={{ backgroundColor: '#06BD95' }}>Comment</Button><Button variant='contained' sx={{ backgroundColor: 'red', marginLeft: '10px' }} onClick={() => handleDelete(post._id)}>Delete</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid>
                    <Typography>
                        {itemPerPage >= 10 ? `Showing 0 to ${itemPerPage} of ${count}` : `Showing 0 to ${count} of ${count}`}
                    </Typography>
                </Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button variant="contained" sx={{ backgroundColor: '#06BD95' }} onClick={handlePrevPage}><ArrowBack></ArrowBack></Button>
                    {
                        pages.map(page => <Button onClick={() => setCurrentPage(page)} key={page}>{page}</Button>)
                    }
                    <Button variant="contained" sx={{ backgroundColor: '#06BD95' }} onClick={handleNextPage}><ArrowForward></ArrowForward></Button>

                </Grid>
            </Grid>


        </Grid>
    );
};

export default MyPosts;