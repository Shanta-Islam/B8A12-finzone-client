
import "../../../styles/HomeStyles.css";
// import { useContext, useState } from "react";
import Tags from "./Tags";
// import { SearchContext } from "../../../Context/SearchContextProvider";
// import usePosts from "../../../Hooks/usePosts";

const Banner = () => {
   
    return (
        <div className="header" style={{ backgroundImage: `url(https://i.ibb.co/zPmFm5k/hero-img.jpg)` }}>
            <div className="headerContainer">
                <form>
                    <input type="text" name='search'  placeholder="Search here...." />
                    <button type='submit' >Search</button>
                </form>
                <Tags></Tags>
            </div>
            
        </div>

    );
};

export default Banner;