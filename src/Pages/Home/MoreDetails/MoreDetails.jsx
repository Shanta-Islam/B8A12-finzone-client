import { Button, Card, Grid, Typography } from "@mui/material";
import internet from "../../../assets/Internet.png"

const MoreDetails = () => {
    return (
        <Grid sx={{ textAlign: "center", color: "#000", padding: "0px 80px" }}>
            <Card sx={{ flexGrow: 1, bgcolor: "#fff", color: "#000", margin: '20px 0px', padding: "40px", borderRadius: "4px" }}>
                <Grid container spacing={2} sx={{alignItems: "center", justifyContent: "center"}}>
                    <Grid item xs={12} md={8}>

                        <img src={internet} alt="" className="imgIcon" />
                        <Typography variant="h5">You will love our solutions</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button variant="contained" sx={{backgroundColor: '#00A9FF', my: '20px'}}>Details</Button>
                    </Grid>



                </Grid>
            </Card>
        </Grid>
    );
};

export default MoreDetails;