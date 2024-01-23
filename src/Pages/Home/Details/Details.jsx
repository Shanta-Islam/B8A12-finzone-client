
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { Button, CardHeader, Grid } from '@mui/material';
import userIcon from "../../../assets/Briefcase.png";
import premiumIcon from "../../../assets/setting-icon.png";


export default function Details() {
    return (
        <Grid sx={{ padding: '30px 50px', margin: 'auto', textAlign: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>

                        <Card sx={{ maxWidth: 800, margin: 'auto', bgcolor: "#fcf3da" }} item md={6}>
                            <img src={userIcon} alt="" />
                            <CardHeader

                                title="Normal User"
                                subheader="Normal user create only 5 posts."
                            />
                            <CardActions disableSpacing>
                                <Button sx={{ textAlign: "center" }}>Details</Button>
                            </CardActions>

                        </Card>

                    </Grid>
                    <Grid item xs={12} md={6}>

                        <Card sx={{ maxWidth: 800, margin: 'auto', bgcolor: "#cfedf4" }} item md={6}>
                            <img src={premiumIcon} alt="" />
                            <CardHeader
                                title="Premium User"
                                subheader="Premium user create more than 5 posts and as much as needed."
                            />
                            <CardActions disableSpacing>
                                <Button sx={{ textAlign: "center" }}>Details</Button>
                            </CardActions>

                        </Card>

                    </Grid>
                </Grid>
            </Box>


        </Grid>

    );
}