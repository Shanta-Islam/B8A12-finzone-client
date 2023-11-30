
import "../../../styles/HomeStyles.css";
import { useState } from "react";
import Tags from "./Tags";
// import usePosts from "../../../Hooks/usePosts";

const Banner = () => {
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        const searchText = e.target.search.value;
        console.log(searchText)
        setSearch(searchText)

    }
    // console.log(search)
    // const posts = usePosts(search);
    return (
        <div className="header" style={{ backgroundImage: `url(https://i.ibb.co/zPmFm5k/hero-img.jpg)` }}>
            <div className="headerContainer">
                <form onSubmit={handleSearch}>
                    <input type="text" name='search' placeholder="Search here...." />
                    <button type='submit'>Search</button>
                </form>
                <Tags></Tags>
            </div>
            
        </div>

    );
};

export default Banner;