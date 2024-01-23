import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";


const Countdown = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetch(`https://finzone-server.vercel.app/postsCount`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
            })
    }, [])
    return (
        <Grid sx={{ textAlign: "center", color: "#fff", marginTop: "40px" }}>
            <Box sx={{ flexGrow: 1,  bgcolor: "#00A9FF", color: "#fff", margin: '20px 0px', padding: "80px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h5">20 <br/>Users</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h5">{count} <br/>Posts</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h5">5 <br/>Tags</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h5">5 <br/>Premium Members</Typography>
                    </Grid>                    

                </Grid>
            </Box>
        </Grid>








                );
};

                export default Countdown;