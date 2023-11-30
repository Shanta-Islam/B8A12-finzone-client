import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSinglePostComment from "../../../Hooks/useSinglePostComment";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Grid, MenuItem, Modal, Select, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const SinglePostComments = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const [report, setReport] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(0);
    const [itemPerPage, SetItemPerPage] = useState(10);
    const numsOfPage = Math.ceil(count / itemPerPage);
    const pages = [];
    for (let i = 0; i < numsOfPage; i++) {
        pages.push(i);
    }
    const [comments] = useSinglePostComment(id, currentPage, itemPerPage);

    // console.log(count)
    useEffect(() => {
        fetch(`https://finzone-server.vercel.app/commentsCount/${id}`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)

            })
    }, [id])
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
    // console.log(report)
    
    const [open, setOpen] = useState(false);
    const handleOpen = (comment) => {
        
        setOpen(true)
        
    };
    const handleClose = () => setOpen(false);
    // console.log(comment);


    const handleSetReport=(comment)=>{
        const item={
            comment,
            report
        }
        axiosSecure.post(`/reports`, item)
            .then(res => {
                console.log(res.data)
                
            })
    }

    return (
        <Grid>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>All Comments</Typography>
            <TableContainer component='main' container sx={{ padding: '30px 50px' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell>Commenter Email</StyledTableCell>
                            <StyledTableCell>Comment</StyledTableCell>
                            <StyledTableCell>FeedBack</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments.map((comment, index) => (
                            <StyledTableRow key={comment._id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>{comment?.email}</StyledTableCell>
                                <StyledTableCell>{comment?.data.comment.length > 20 ? (
                                    <Typography>{comment?.data.comment.slice(0, 20)}<Button onClick={()=>handleOpen(comment)}>...read more</Button></Typography>
                                ) : (

                                    <Typography>{comment?.data.comment}</Typography>
                                )}</StyledTableCell>
                                <StyledTableCell>
                                    <Select
                                        label="tag"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        onChange={(e) => setReport(e.target.value)}
                                    >
                                        {/* {
                                            tags?.map(tag => )
                                        } */}
                                        <MenuItem value="Hate Speech">Hate Speech</MenuItem>
                                        <MenuItem value="False Information">False Information</MenuItem>
                                        <MenuItem value="Harassment">Harassment</MenuItem>
                                    </Select>
                                </StyledTableCell>
                                <StyledTableCell>
                                    {report ?
                                        <Link style={{ textDecoration: 'none' }}>
                                            <Button variant='contained' sx={{ backgroundColor: '#06BD95' }} onClick={()=>handleSetReport(comment)}>Report</Button>
                                        </Link>
                                        :
                                        <Link style={{ textDecoration: 'none' }}>
                                            <Button variant='contained' sx={{ backgroundColor: '#06BD95' }} disabled>Report</Button>
                                        </Link>
                                    }

                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!comments.length ?
                "No Post Found"
                :
                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid>
                        <Typography>
                            {itemPerPage == 10 ? `Showing 0 to ${count} of ${count}` : `Showing 0 to ${itemPerPage} of ${count}`}
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
            }
            <Modal
                open={open}
                onClose={handleClose}
               
                // comment={comment}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <p>{comment?.data.comment}</p> */}
                   
                </Box>
            </Modal>

        </Grid>


    );
};

export default SinglePostComments;