import { useLoaderData } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import ShareIcon from '@mui/icons-material/Share';
import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { ThumbDownAlt, ThumbUpAlt } from '@mui/icons-material';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { useForm } from "react-hook-form";
import { FacebookIcon, FacebookShareButton } from "react-share";
import toast, { Toaster } from "react-hot-toast";


const PostDetails = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const singlePost = useLoaderData();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {

        const items = {
            email: user?.email,
            data,
            postId: singlePost._id

        }

        if (user) {
            const res = await axiosSecure.post('/comments', items)
            // console.log(res.data)
            if (res.data.insertedId) {
                reset();
            }
        }
        else{
            toast.error('Please Login First');
        }
    }
    // console.log(singlePost)
    const handleLike = (id) => {

        if (user) {
            axiosSecure.patch(`/${id}/like`)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        // refetch();
                    }
                })
        }
        else {
            toast.error('Please Login First');
        }
        // console.log(id)
    }
    const handleDisLike = (id) => {
        if (user) {
            axiosSecure.patch(`/${id}/dislike`)
                .then(res => {
                    console.log(res.data)
                    // if (res.data.modifiedCount > 0) {
                    //     // refetch();
                    // }
                })
        }
        else {
            toast.error('Please Login First');
        }
    }
    const shareUrl = `https://finzone-server.vercel.app/post/${singlePost._id}`;

    return (
        <Grid component='main' container sx={{ padding: '30px 50px', gap: '15px', margin: 'auto' }}>
            <Card key={singlePost._id} sx={{ maxWidth: 800, margin: 'auto' }} item xs={6}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={singlePost.data.authorImg}>

                        </Avatar>
                    }
                    title={singlePost.data.authorName}
                    subheader={singlePost.date}
                />
                <Typography color="text.secondary" sx={{ margin: '10px' }}>
                    Tags: {singlePost.data.tag}
                </Typography>
                <Typography color="text.secondary" sx={{ margin: '10px' }}>
                    Post Title: {singlePost.data.postTitle}
                </Typography>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {singlePost.data.postDesc}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to like">
                        <ThumbUpAlt onClick={() => handleLike(singlePost._id)}></ThumbUpAlt>
                    </IconButton>
                    <IconButton aria-label="share">
                        <FacebookShareButton url={shareUrl} className="Demo__some-network__share-button">
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                    </IconButton>
                    <IconButton aria-label="add to dislike">
                        <ThumbDownAlt onClick={() => handleDisLike(singlePost._id)}></ThumbDownAlt>
                    </IconButton>
                </CardActions>
                <form onSubmit={handleSubmit(onSubmit)} style={{ height: '200px', margin: '10px' }}>
                    <TextField fullWidth label='comment here' {...register("comment")} required></TextField>
                    <Button variant='contained' sx={{ backgroundColor: '#00A9FF', margin: '10px 0px', display: 'flex', justifyContent: 'end' }} type="submit">Comment</Button>
                </form>
            </Card>
            <Toaster />
        </Grid>
    );
};

export default PostDetails;