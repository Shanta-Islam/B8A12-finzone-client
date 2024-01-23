import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
// import toast, { Toaster } from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import bronzeBadge from "../../assets/bronze.png";
import GoogleIcon from '@mui/icons-material/Google';
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const axiosPublic = useAxiosPublic();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const from = location.state?.from?.pathname || "/";
    // console.log('state in the location login page', location.state)
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                console.log(result.user);
                toast.success("Successfully Sign In")
                navigate(from, { replace: true });

            })
    }

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
                        else {
                            toast.success('Successfully Sign In')
                            navigate(location?.state ? location.state : '/');
                        }
                    })

            })
            .catch(error => console.log(error));
    }
    return (
        <Grid container component="main" sx={{ height: '100vh', }}>
            <Grid
                item

                xs={false}
                sm={4}
                md={5}
                sx={{
                    backgroundImage: 'url(https://i.ibb.co/c3j6YMD/bg.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#00A9FF',
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
                    <Typography variant="h4">Please Login</Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type='email'
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type='password'
                            required
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            Login
                        </Button>
                    </form>
                    <Typography varient='h4' sx={{ textAlign: 'center', margin: '10px' }}>Don't have an account <Link to="/register">SignUp</Link></Typography>
                    <Grid>
                        <Button onClick={handleGoogleSignIn} variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth>
                            <GoogleIcon></GoogleIcon>
                            <span>Register with Google</span>
                        </Button>
                    </Grid>
                </Box>
                <Toaster />
            </Grid>
            
        </Grid>
    );
};

export default Login;