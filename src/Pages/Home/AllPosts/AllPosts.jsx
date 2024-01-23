import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, Button, Divider, Grid } from '@mui/material';
import { ArrowBack, ArrowForward, CommentRounded, ThumbDownAlt, ThumbUpAlt } from '@mui/icons-material';
import { Link } from 'react-router-dom';
// import usePosts from '../../../Hooks/usePosts';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AllPosts = ({postsList}) => {
    const [asc, setAsc] = useState(true);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 2;
    const numsOfPage = Math.ceil(count / itemPerPage);
    const pages = [];
    for (let i = 0; i < numsOfPage; i++) {
        pages.push(i);
    }
    // const posts = usePosts(currentPage, itemPerPage);

    useEffect(() => {
        fetch(`https://finzone-server.vercel.app/postsCount`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
            })
    }, [])
    // const handlePrevPage = () => {
    //     if (currentPage > 0) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // }
    // const handleNextPage = () => {
    //     if (currentPage < pages.length - 1) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // }


    // const rows = postsList.slice(currentPage % itemPerPage, currentPage + 1 % itemPerPage);
    // const handlePageChange = (pageNumber)=>{
    //     setCurrentPage(pageNumber);
    // }

    return (
        <Grid sx={{ padding: '30px 50px', margin: 'auto' }}>
            {/* <Button variant='contained' sx={{ margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00A9FF' }} onClick={() => setAsc(!asc)}>Sort By Popularity</Button> */}
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {
                        postsList?.reverse().map(post => <Grid key={post._id} item xs={12} md={12}>
                            <Card sx={{ margin: 'auto' }} item xs={12}>

                                <Link to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" src={post?.data.authorImg}>

                                            </Avatar>
                                        }
                                        title={post.data.authorName}
                                        subheader={post.date}
                                    />
                                    <Typography color="text.secondary" sx={{ margin: '10px' }}>
                                        Tags: {post.data.tag}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ margin: '10px' }}>
                                        Post Title: {post.data.postTitle}
                                    </Typography>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {post.data.postDesc.slice(0, 100)}...
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing sx={{ pointerEvents: 'none' }}>
                                        <IconButton aria-label="add to like" sx={{ border: '1px solid gray', borderRadius: '0', padding: '1px 20px' }}>
                                            <ThumbUpAlt></ThumbUpAlt>
                                            <Typography sx={{ margin: '0px 6px' }}>{post.upVote}</Typography>
                                            <Divider orientation="vertical" flexItem />
                                            <ThumbDownAlt></ThumbDownAlt>
                                            <Typography sx={{ margin: '0px 6px' }}>{post.downVote}</Typography>
                                            {/* <Divider orientation="vertical" flexItem />
            <Typography sx={{ margin: '0px 6px' }}>{post.voteDifference}</Typography> */}
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <CommentRounded />
                                        </IconButton>

                                    </CardActions></Link>

                            </Card>
                        </Grid>)
                    }


                </Grid>
            </Box>
            {/* <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid>
                    <Typography>
                        {itemPerPage > 5 ? `Showing 0 to ${count} of ${count}` : `Showing 0 to ${itemPerPage} of ${count}`}
                    </Typography>
                </Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button variant="contained" sx={{ backgroundColor: '#00A9FF' }} onClick={()=>handlePageChange(currentPage -1)}><ArrowBack></ArrowBack></Button>
                    {
                        pages.map(page => <Button onClick={() => setCurrentPage(page)} key={page}>{page}</Button>)
                    }
                    <Button variant="contained" sx={{ backgroundColor: '#00A9FF' }} onClick={()=>handlePageChange(currentPage +1)}><ArrowForward></ArrowForward></Button>

                </Grid>
            </Grid> */}
        </Grid>
    );
};

AllPosts.propTypes = {
    postsList: PropTypes.object,
}
export default AllPosts;
