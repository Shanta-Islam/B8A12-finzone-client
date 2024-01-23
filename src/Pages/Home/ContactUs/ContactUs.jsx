import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const ContactUs = () => {
    return (
        <Grid item elevation={6} square>
            <Box
                sx={{
                    m: 5,
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
                        m: 0,
                        "& h4 ": {
                            fontSize: "1.5rem",
                        },
                    },
                }}
            >
                <Typography variant="h4">Contact</Typography>
                <form action='https://formspree.io/f/mvojplja' method='POST'>
                    <TextField
                        label="Your Name"
                        name="name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type='text'
                        required
                    />
                    <TextField
                        label="Your Email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type='email'
                        required
                    />
                    <TextField
                        label="Your Phone Number"
                        name="phone"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type='number'
                        required
                    />
                    <TextField
                        label="Message"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type='text'
                        required
                    />
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#00A9FF', marginTop: '10px' }}
                        type="submit"
                        fullWidth
                    >
                        Contact
                    </Button>
                </form>
            </Box>
        </Grid>
    );
};

export default ContactUs;