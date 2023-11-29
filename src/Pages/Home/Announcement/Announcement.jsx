
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Avatar, Grid } from '@mui/material';


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

export default function CustomizedTables() {
    const axiosPublic = useAxiosPublic();
    const { data: announcement = [] } = useQuery({
        queryKey: ['announcement'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcements')
            if (res.data.length == 0) {
                return
            }
            else {
                return res.data

            }


        }
    })
    return (
        <Grid>
            {
                announcement.length ?
                    <TableContainer component='main' container sx={{ padding: '30px 50px' }}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                                            {index+1}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            <Avatar src={a?.data?.authorImg}></Avatar>
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {a?.data?.authorName}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {a?.data?.title}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {a?.data?.description.slice(0, 150)}...
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    ''
            }
        </Grid>
    );
}