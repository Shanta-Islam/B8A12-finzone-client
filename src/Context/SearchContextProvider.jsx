import React, { useEffect, useState } from "react";
import usePosts from "../Hooks/usePosts";




const SearchContext = React.createContext();
const SearchProvider = ({ children }) => {
    const posts = usePosts();
    const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState([]);
    const [isError, setIsError] = useState({ show: "false", msg: "" });
    const getDatas = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if (data) {
                setIsLoading(false);
                setPostData(data);
            }
            else {
                setIsError({
                    show: true,
                    msg: data.error
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    

useEffect(() => {
    getDatas(posts);
    
    

},[posts]);
console.log(posts);

return <SearchContext.Provider value={{ isLoading, isError, postData, setPostData }}>
    {children}
</SearchContext.Provider>
};



export { SearchContext, SearchProvider };