import { Grid } from "@mui/material";
import Banner from "../Banner/Banner";
import About from "../About/About";
import Announcement from "../Announcement/Announcement";
import AllPosts from "../AllPosts/AllPosts";
import ContactUs from "../ContactUs/ContactUs";
import { useEffect, useState } from "react";
import Details from "../Details/Details";
import Countdown from "../Countdown/Countdown";
import Fqa from "../Fqa/Fqa";
import MoreDetails from "../MoreDetails/MoreDetails";
import { useLoaderData } from "react-router-dom";

// import { useContext, useState } from "react";
// import { SearchContext } from "../../../Context/SearchContextProvider";

const Home = () => {
    const postItems = useLoaderData();
    const [postsList, setpostsList] = useState(postItems);
    console.log(postsList)
    const [searchVal, setSearchVal] = useState("");
    const handleSearchClick = (e) => {
        
        e.preventDefault();
        
        if (searchVal === "") {
            setpostsList(postItems); 
            return;
        }
        else {
            const filterBySearch = postsList.filter((item) => {
                if (item.data.tag.toLowerCase().includes(searchVal.toLowerCase())) {
                    return true;
                }
                
                
            })
           
            // console.log(searchResults)
            setpostsList(filterBySearch);
        }
        
        
        
    }

    console.log(postsList)
    
    return (
        <Grid>
            <Banner  handleSearchClick={handleSearchClick} setSearchVal={setSearchVal}></Banner>
            <About></About>
            <Details></Details>
            <Countdown></Countdown>
            <Announcement></Announcement>
            <AllPosts postsList={postsList}></AllPosts>
            <Fqa></Fqa>
            <MoreDetails></MoreDetails>
            <ContactUs></ContactUs>
        </Grid>
    );
};

export default Home;