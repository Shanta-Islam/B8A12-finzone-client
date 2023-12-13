import { Grid } from "@mui/material";
import Banner from "../Banner/Banner";
import About from "../About/About";
import Announcement from "../Announcement/Announcement";
import AllPosts from "../AllPosts/AllPosts";
import ContactUs from "../ContactUs/ContactUs";
// import { useContext, useState } from "react";
// import { SearchContext } from "../../../Context/SearchContextProvider";

const Home = () => {

    return (
        <Grid>
            <Banner ></Banner>
            <About></About>
            <Announcement></Announcement>
            <AllPosts ></AllPosts>
            <ContactUs></ContactUs>

        </Grid>
    );
};

export default Home;