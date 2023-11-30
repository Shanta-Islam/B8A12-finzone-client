import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Grid, Typography } from "@mui/material";

const Tags = () => {
    const axiosPublic = useAxiosPublic();
    const [tags, setTags] =useState([]);
    useEffect(()=>{
        axiosPublic.get('/tags')
        .then(res=>setTags(res.data));
    },[axiosPublic])
    return (
        <Grid >
            <Typography sx={{display: 'flex', justifyContent: 'center'}}>
                {
                    tags?.map(tag=><Typography key={tag._id} variant='h6' sx={{margin:'10px', display: 'flex', justifyContent:'space-between'}}>{tag.data.tag}</Typography>)
                }
            </Typography>
        </Grid>
    );
};

export default Tags;