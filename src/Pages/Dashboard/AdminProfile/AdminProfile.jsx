
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form"; 
// import { Cell, PieChart, Pie, Legend, ResponsiveContainer } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const tagItems = {
            data
        }
        const res = await axiosSecure.post('/tags', tagItems)
        reset()
        // console.log(res.data)
    }
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}`)

            return res.data


        }
    })
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    // console.log(stats)
    // custom shape for the bar chart



    // const data1 = [
    //     { name: "Total Donation", value: '50' },
    //     { name: "Your Donation", value: '50'},
    // ];
    // const RADIAN = Math.PI / 180;
    // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //     const y = cy + radius * Math.sin(-midAngle * RADIAN);
    //     return (
    //         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    //             {`${(percent * 100).toFixed(0)}%`}
    //         </text>
    //     );
    // };

    // const pieChartData = data1.map(data => {
    //     return {name: data.name, value: data.value}
    // })

    // return { name: data.user, value: data.comments }

    return (
        <Grid>
            <Card sx={{ margin: 'auto' }} item xs={6}>
                <CardHeader
                    avatar={
                        <Avatar alt="Remy Sharp" src={user?.photoURL} />
                    }
                    title={data?.name}
                    subheader={data?.email}
                />
                <Divider />
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card sx={{ border: '1px solid gray', margin: 'auto', display: 'flex', gap: '2px' }} item>
                        <CardContent>
                            <Typography variant="h5" color="text.secondary">
                                Number of Posts: {stats.post}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ border: '1px solid gray', margin: 'auto', display: 'flex', gap: '2px' }} item>
                        <CardContent>
                            <Typography variant="h5" color="text.secondary">
                                Number of Comments: {stats.comments}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ border: '1px solid gray', margin: 'auto', display: 'flex', gap: '2px' }} item>
                        <CardContent>
                            <Typography variant="h5" color="text.secondary">
                                Number of Users: {stats.user}
                            </Typography>
                        </CardContent>
                    </Card>



                </CardContent>
                <CardActions disableSpacing>

                </CardActions>
            </Card>
            {/* <ResponsiveContainer width={400} height={400} className="text-center">
                <PieChart width={400} height={400}>
                    <Legend layout="horizontal" verticalAlign="bottom" align="bottom" />
                    <Pie
                        data={data1}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="tags"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type='text'
                    {...register("tag")}
                    required
                />
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#06BD95', marginTop: '10px' }}
                    type="submit"
                    fullWidth
                >
                    Add Tags
                </Button>
            </form>
        </Grid>
    );
};

export default AdminProfile;