
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Divider, Grid } from '@mui/material';
import { CommentRounded, ThumbDownAlt, ThumbUpAlt } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';


export default function Announcement() {
  const axiosSecure = useAxiosSecure();
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts`)
      return res.data
    }

  });
  console.log(posts);
  return (
    <Grid component='main' container sx={{ padding: '30px 50px', gap: '15px', margin: 'auto' }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 3, md: 3 }}>
      {
        posts.map(post =>
          <Card key={post._id} sx={{ maxWidth: 345, margin: 'auto' }} item xs={6}>
            <Grid>
              <Link to={`/post/${post._id}`} style={{textDecoration: 'none'}}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" src={post.data.authorImg}>

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
                <CardActions disableSpacing>
                  <IconButton aria-label="add to like" sx={{border: '1px solid gray', borderRadius: '0', padding: '1px 20px'}}>
                    <ThumbUpAlt></ThumbUpAlt>
                    <Divider orientation="vertical" flexItem />
                    <Typography sx={{margin: '0px 6px'}}>{post.upVote}</Typography>
                  </IconButton>
                  <IconButton aria-label="share">
                    <CommentRounded />
                  </IconButton>
                  <IconButton aria-label="add to like" sx={{border: '1px solid gray', borderRadius: '0', padding: '1px 20px'}}>
                    <ThumbDownAlt></ThumbDownAlt>
                    <Divider orientation="vertical" flexItem />
                    <Typography sx={{margin: '0px 6px'}}>{post.downVote}</Typography>
                  </IconButton>
                </CardActions></Link>
            </Grid>
          </Card>

        )
      }

    </Grid>

  );
}