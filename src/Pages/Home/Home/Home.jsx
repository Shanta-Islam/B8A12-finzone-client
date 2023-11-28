import { Grid } from "@mui/material";
import Banner from "../Banner/Banner";
import Posts from "../Posts/Posts";
import About from "../About/About";
import Announcement from "../Announcement/Announcement";

const Home = () => {
    return (
        <Grid>
            <Banner></Banner>
            <About></About>
            <Announcement></Announcement>
            <Posts></Posts>
        </Grid>
    );
};

export default Home;