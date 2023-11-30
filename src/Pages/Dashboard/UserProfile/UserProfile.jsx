
import { Avatar, Badge, Box, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import goldBadge from '../../../assets/gold.png';
import bronzeBadge from '../../../assets/bronze.png';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const UserProfile = () => {
    const [users, setUsers] =useState([]);
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user?.email}`)

            return res.data


        }
    })
    const { data: posts = [] } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosPublic.get(`recentPosts/${user?.email}`)

            return res.data


        }
    })
    useEffect(() => {
        axiosPublic.get(`/user/${user?.email}`)
            .then(res => {
                setUsers(res.data)
            })
    }, [axiosPublic, user?.email])
    
    return (
        <Grid>
            <Card sx={{ margin: 'auto' }} item xs={6}>
                <CardHeader
                    avatar={
                        <Badge

                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <Avatar alt="Travis Howard" src={users.status? `${goldBadge}`: `${bronzeBadge}`} sx={{ width: '30px', height: '30px' }} />

                            }
                        >
                            <Avatar alt="Remy Sharp" src={user?.photoURL} />
                        </Badge>
                    }
                    title={data?.name}
                    subheader={data?.email}
                />
                <Divider />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {
                            posts?.map(post => <Grid key={post._id} item xs={12} md={4}>
                                <Item >
                                    <Card sx={{ maxWidth: 345, margin: 'auto' }} item xs={6}>

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
                                                Post Title: {post.data.postTitle}
                                            </Typography>
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    {post.data.postDesc.slice(0, 100)}...
                                                </Typography>
                                            </CardContent>
                                            </Link>

                                    </Card>
                                </Item>
                            </Grid>)
                        }


                    </Grid>
                </Box>
                <CardActions disableSpacing>
                    {/* <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton> */}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default UserProfile;