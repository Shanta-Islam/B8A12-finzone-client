import { Grid } from "@mui/material";
import Banner from "../Banner/Banner";
import About from "../About/About";
import Announcement from "../Announcement/Announcement";
import AllPosts from "../AllPosts/AllPosts";

const Home = () => {
    return (
        <Grid>
            <Banner></Banner>
            <About></About>
            <Announcement></Announcement>
            <AllPosts></AllPosts>
           
        </Grid>
    );
};

export default Home;