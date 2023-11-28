
import { Avatar, Badge, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const UserProfile = () => {
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
    console.log(posts)
    return (
        <Grid>
            <Card sx={{ margin: 'auto' }} item xs={6}>
                <CardHeader
                    avatar={
                        <Badge

                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <Avatar alt="Travis Howard" src={data?.badge} sx={{ width: '30px', height: '30px' }} />

                            }
                        >
                            <Avatar alt="Remy Sharp" src={user?.photoURL} />
                        </Badge>
                    }
                    title={data?.name}
                    subheader={data?.email}
                />
                <Divider />
                <CardContent >

                    {posts.map(post => (

                        <Card key={post._id} sx={{ maxWidth: 345, margin: '10px' }} item xs={6}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="authorimg" src={post?.data?.authorImg}>

                                    </Avatar>
                                }
                                title={post?.data?.authorName}
                                subheader={post?.data?.postTitle}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {post?.data?.postDesc.slice(0, 100)}...
                                </Typography>
                            </CardContent>
                        </Card>

                    ))}


                </CardContent>
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