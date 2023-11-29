
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import "../../../styles/HomeStyles.css";
import { useEffect, useState } from "react";

const Banner = () => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState('');
    const handleSearch = (event)=>{
        event.preventDefault();
        const searchText = event.target.value;
        setSearch(searchText)
        
    }
    useEffect(()=>{
        axiosPublic.get(`/post?search=${search}`)
        .then(res=>{
            console.log(res.data)
        })
    },[axiosPublic, search])
    return (
        <div className="header" style={{ backgroundImage: `url(https://i.ibb.co/zPmFm5k/hero-img.jpg)` }}>
            <div className="headerContainer">
                <input type="text" placeholder="Search here...." onChange={handleSearch}/>
                <button className="" onClick={handleSearch}>Search</button>
            </div>
        </div>

    );
};

export default Banner;