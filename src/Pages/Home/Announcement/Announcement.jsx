
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';


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

export default function Announcement() {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(0);
    const [itemPerPage, SetItemPerPage] = useState(10);
    const numsOfPage = Math.ceil(count / itemPerPage);
    const pages = [];
    for (let i = 0; i < numsOfPage; i++) {
        pages.push(i);
    }
    const { data: announcement = [], refetch } = useQuery({
        queryKey: ['announcement'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/announcements?page=${currentPage}&size=${itemPerPage}`)
            if (res.data.length == 0) {
                return
            }
            else {
                return res.data

            }


        }
    })
    useEffect(() => {
        fetch('http://localhost:5000/announcementsCount')
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
                refetch()
            })
    }, [refetch])
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
        <Grid sx={{ padding: '30px 50px' }}>
            {
                announcement.length ?
                    <Grid>
                        <TableContainer>
                            <Table sx={{ minWidth: 700, marginBottom:'10px' }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell></StyledTableCell>
                                        <StyledTableCell>Author Image</StyledTableCell>
                                        <StyledTableCell>Author Name</StyledTableCell>
                                        <StyledTableCell>Title</StyledTableCell>
                                        <StyledTableCell>Description</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {announcement.map((a, index) => (
                                        <StyledTableRow key={a.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {index + 1}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Avatar src={a?.data?.authorImg}></Avatar>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {a?.data?.authorName}
                                            </StyledTableCell>
                                            <StyledTableCell >
                                                {a?.data?.title}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {a?.data?.description.slice(0, 150)}...
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> 
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Grid>
                                <Typography>
                                    {itemPerPage >= 11 ? `Showing 0 to ${itemPerPage} of ${count}` : `Showing 0 to ${count} of ${count}`}
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
                    :
                    ''
            }
        </Grid>
    );
}