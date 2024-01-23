import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const AddPost = () => {

   
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [posts, setPosts] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const date = new Date().toDateString();
    useEffect(() => {
        axiosPublic.get('/tags')
            .then(res => {
                setTags(res.data)
            })
    }, [axiosPublic])
    useEffect(() => {
        axiosPublic.get(`/postsCount/${user?.email}`)
            .then(res => {
                setPosts(res.data)
            })
    }, [axiosPublic, user?.email])
    useEffect(() => {
        axiosPublic.get(`/user/${user?.email}`)
            .then(res => {
                setUserInfo(res.data)
            })
    }, [axiosPublic, user?.email])
    // console.log(tags)
    const onSubmit = async (data) => {
        const postItems = {
            upVote: 0,
            downVote: 0,
            date,
            email: user?.email,
            data
        }
        const res = await axiosPublic.post('/posts', postItems)
        navigate("/dashboard/myPost")
        // reset()

        console.log(res.data)
    }
    // console.log((!userInfo?.status, posts.count))
    return (
        <Grid elevation={6} square>
            {!userInfo?.status && posts.count>=5 ?
                <Box sx={{
                    my: 3,
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
                }}>
                    <Link to='/membership'><Button variant='contained' sx={{ backgroundColor: '#00A9FF', marginTop: '10px' }}>Become a member</Button></Link>

                </Box>
                :
                <Box
                    sx={{
                        my: 3,
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
                    <Typography variant="h4">Add Post</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Author Image"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type='text'
                            {...register("authorImg")}
                            required
                        />
                        <TextField
                            label="Author Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type='text'
                            {...register("authorName")}
                            required
                        />
                        <TextField
                            label="Author Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type='email'
                            {...register("authorEmail")}
                            required
                        />
                        <TextField
                            label="Post Title"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type='text'
                            {...register("postTitle")}
                            required
                        />
                        <TextField
                            label="Post Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type='text'
                            {...register("postDesc")}
                            required
                        />
                        <Select
                            label="tag"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("tag")}
                            required
                        >
                            {
                                tags?.map(tag => <MenuItem key={tag._id} value={tag.data.tag}>{tag.data.tag}</MenuItem>)
                            }
                        </Select>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#00A9FF', marginTop: '10px' }}
                            type="submit"
                            fullWidth
                        >
                            Add Post
                        </Button>
                    </form>

                </Box >


            }

        </Grid>
    );
};

export default AddPost;