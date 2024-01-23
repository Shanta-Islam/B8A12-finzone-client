import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <Grid container component="main" sx={{ padding: '0px 50px' }}>
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
                <Typography variant="h4">About</Typography>
                <Typography variant="p">There are two types of users like normal users and premium user. Normal users create only 5 posts and premium users create more than 5 posts.</Typography>
                <Typography variant="p">If you are not registered member yet than please </Typography>
                <Link to='/register'><Button variant="contained" sx={{ backgroundColor: '#00A9FF', my: '20px' }}>Register</Button></Link>
            </Box>
        </Grid>
    );
};

export default About;