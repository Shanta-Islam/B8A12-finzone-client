import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Grid, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";


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
const ReportedComments = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(0);
    const [itemPerPage, SetItemPerPage] = useState(10);
    const numsOfPage = Math.ceil(count / itemPerPage);
    const pages = [];
    for (let i = 0; i < numsOfPage; i++) {
        pages.push(i);
    }
    const [reports, setReports] = useState([]);
    useEffect(() => {
        axiosSecure(`https://finzone-server.vercel.app/reports?page=${currentPage}&size=${itemPerPage}`)
            .then(res => setReports(res.data))
    }, [axiosSecure, currentPage, itemPerPage])
    console.log(reports);

    useEffect(() => {
        fetch(`https://finzone-server.vercel.app/reportsCount`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)

            })
    }, [])
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
    return (
        <Grid>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>All Reports</Typography>
            <TableContainer component='main' container sx={{ padding: '30px 50px' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell>Commenter Email</StyledTableCell>
                            <StyledTableCell>Comment</StyledTableCell>
                            <StyledTableCell>Owner FeedBack</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((report, index) => (
                            <StyledTableRow key={report._id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>{report?.comment.email}</StyledTableCell>
                                <StyledTableCell>
                                    <Typography>{report?.comment.data.comment}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>{report?.report}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>

                                    <Link style={{ textDecoration: 'none' }}>
                                        <Button variant='contained' sx={{ backgroundColor: '#06BD95' }} >Banned Commenter</Button>
                                    </Link>

                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!reports.length ?
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


        </Grid>
    );
};

export default ReportedComments;