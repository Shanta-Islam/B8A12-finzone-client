import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <Grid container component="main" sx={{padding: '0px 50px'}}>
            <Box
                sx={{
                    my: 4,
                    textAlign: "center",
                    p: 2,
                    "& h4": {
                        fontWeight: "bold",
                        my: 2,
                        fontSize: "2rem",
                    },
                    "& p": {
                        textAlign: "justify",
                    },
                    "@media (max-width:600px)": {
                        mt: 0,
                        "& h4 ": {
                            fontSize: "1.5rem",
                        },
                    },
                }}
            >
                <Typography variant="h4">JOIN OUR FORUM !</Typography>
                <Typography>Talk about anything that's on your mind and see what others think. As a guest to our forum you are only able to view posts. When you register with the Forumix forum you can join in with topics, start new topics and generally be a part of the first level of our community.</Typography>
                <Link to='/register'><Button variant="contained" sx={{backgroundColor: '#06BD95', my: '20px'}}>Register</Button></Link>
            </Box>
        </Grid>

    );
};

export default About;