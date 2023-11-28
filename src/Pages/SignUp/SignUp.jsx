import { useContext } from "react";

import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import toast from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import bronzeBadge from "../../assets/bronze.png";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';



const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const googleProvider = new GoogleAuthProvider();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data?.name,
                            email: data?.email,
                            badge: bronzeBadge
                        }
                        console.log(userInfo)
                        axiosPublic.post('/users', userInfo)
                            .then(res => {

                                if (res.data.insertedId) {
                                    console.log('user added')
                                    reset();
                                    navigate('/');
                                }
                            })

                    })
                    .catch(error => console.log(error))
            })
    };

    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    badge: bronzeBadge
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            console.log('user added')
                            toast.success('Successfully Sign In')
                            navigate(location?.state ? location.state : '/');
                        }
                    })
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh', }}>
                <Grid
                    item

                    xs={false}
                    sm={4}
                    md={5}
                    sx={{
                        backgroundImage: 'url(https://i.ibb.co/c3j6YMD/bg.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#06BD95',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <Grid item xs={12} sm={8} md={7} elevation={6} square>
                    <Box
                        sx={{
                            my: 15,
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
                        <Typography variant="h4">Please SignUp</Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type='text'
                                {...register("name", { required: true })}

                            />
                            {errors.name && <Typography>Name is required</Typography>}
                            <TextField
                                label="PhotoURL"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type='text'
                                {...register("photoURL", { required: true })}
                            />
                            {errors.photoURL && <Typography>Photo URL is required</Typography>}
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type='email'
                                {...register("email", { required: true })}
                            />
                            {errors.email && <Typography>Email is required</Typography>}
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type='password'
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })}
                            />
                            {errors.password?.type === 'required' && <Typography>Password is required</Typography>}
                            {errors.password?.type === 'minLength' && <Typography>Password must be 6 characters</Typography>}
                            {errors.password?.type === 'maxLength' && <Typography>Password must be less than 20 characters</Typography>}
                            {errors.password?.type === 'pattern' && <Typography>Password must have one Uppercase one lower case, one number and one special character.</Typography>}
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                SignUp
                            </Button>
                        </form>
                        <Typography varient='h4' sx={{ textAlign: 'center' , margin: '10px' }}>Already have an account <Link to="/login">Login</Link></Typography>
                        <Grid>
                            <Button onClick={handleGoogleSignIn}  variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth>
                                <GoogleIcon></GoogleIcon>
                                <span>Register with Google</span>
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default SignUp;