import { useQuery } from "@tanstack/react-query";
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
import { useEffect, useState } from "react";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(0);
    const [itemPerPage, SetItemPerPage] = useState(10);
    const numsOfPage = Math.ceil(count / itemPerPage);
    const pages = [];
    for (let i = 0; i < numsOfPage; i++) {
        pages.push(i);
    }
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage}&size=${itemPerPage}`)

            return res.data


        }
    })
    useEffect(() => {
        fetch('https://finzone-server.vercel.app/usersCount')
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
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    
                }
            })
    }
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
    console.log(users);
    return (
        <Grid>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>Manage Users</Typography>
            <TableContainer component='main' container sx={{ padding: '30px 50px' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell>User name</StyledTableCell>
                            <StyledTableCell>User email</StyledTableCell>
                            <StyledTableCell>Make admin</StyledTableCell>
                            <StyledTableCell>Subscription Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <StyledTableRow key={user._id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>{user?.name}</StyledTableCell>
                                <StyledTableCell>{user?.email}</StyledTableCell>
                                <StyledTableCell>{user.role==='admin' ? 'Admin': <Button variant='contained' sx={{ backgroundColor: '#00A9FF' }} onClick={() => handleMakeAdmin(user)}>Admin</Button>}</StyledTableCell>
                                <StyledTableCell>{user.status? 'Membership': ''}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid>
                    <Typography>
                        {itemPerPage > 10 ? `Showing 0 to ${itemPerPage} of ${count}` : `Showing 0 to ${count} of ${count}`}
                    </Typography>
                </Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button variant="contained" sx={{ backgroundColor: '#00A9FF' }} onClick={handlePrevPage}><ArrowBack></ArrowBack></Button>
                    {
                        pages.map(page => <Button onClick={() => setCurrentPage(page)} key={page}>{page}</Button>)
                    }
                    <Button variant="contained" sx={{ backgroundColor: '#00A9FF' }} onClick={handleNextPage}><ArrowForward></ArrowForward></Button>

                </Grid>
            </Grid>


        </Grid>
    );
};

export default ManageUsers;