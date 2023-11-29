import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const CreateAnnouncement = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const items = {
            email: user?.email,
            data

        }
        const res = await axiosSecure.post('/announcement', items)
        if (res.data.insertedId) {
            reset();
        }
    }
    return (
        <Grid elevation={6} square>
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
                <Typography variant="h4">Create Announcement</Typography>
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
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type='text'
                        {...register("title")}
                        required
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type='text'
                        {...register("description")}
                        required
                    />
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#06BD95', marginTop: '10px' }}
                        type="submit"
                        fullWidth
                    >
                        Create Announcement
                    </Button>
                </form>

            </Box>
        </Grid>
    );
};

export default CreateAnnouncement;