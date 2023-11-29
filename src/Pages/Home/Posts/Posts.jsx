
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Grid } from '@mui/material';
import { ThumbDownAlt, ThumbUpAlt } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Context/AuthProvider';
import { useContext } from 'react';


export default function Announcement() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts`)
      return res.data
    }

  });
  const handleLike = (id) => {
    axiosSecure.post(`/${id}/like/${user?.email}`)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          // refetch();
        }
      })
  }
  const handleDisLike = (id) => {
    axiosSecure.post(`/${id}/dislike/${user?.email}`)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          // refetch();
        }
      })
  }
  console.log(posts);
  return (
    <Grid component='main' container sx={{ padding: '30px 50px', gap: '15px', margin: 'auto' }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 3, md: 3 }}>
      {
        posts.map(post =>
          <Card key={post._id} sx={{ maxWidth: 345, margin: 'auto' }} item xs={6}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" src={post.data.authorImg}>

                </Avatar>
              }
              title={post.data.authorName}
              subheader={post.date}
            />
            <Typography color="text.secondary" sx={{margin:'10px'}}>
              Post Title: {post.data.postTitle}
            </Typography>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.data.postDesc.slice(0,100)}...
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to like">
                <ThumbUpAlt onClick={() => handleLike(post._id)}></ThumbUpAlt>
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="add to dislike">
                <ThumbDownAlt onClick={() => handleDisLike(post._id)}></ThumbDownAlt>
              </IconButton>
            </CardActions>
          </Card>
        )
      }

    </Grid>

  );
}