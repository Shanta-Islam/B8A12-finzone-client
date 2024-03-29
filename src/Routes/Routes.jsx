import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import Addpost from "../Pages/Dashboard/AddPost/AddPost";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import MyPosts from "../Pages/Dashboard/MyPosts/MyPosts";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import CreateAnnouncement from "../Pages/Dashboard/CreateAnnouncement/CreateAnnouncement";
import PostDetails from "../Pages/PostDetails/PostDetails";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import AdminRoute from "./AdminRoute";
import Membership from "../Pages/Membership/Membership";
import SinglePostComments from "../Pages/Dashboard/SinglePostComments/SinglePostComments";
import ReportedComments from "../Pages/Dashboard/ReportedComments/ReportedComments";
import PrivateRoute from "./PrivateRoute";
import About from "../Pages/About/About";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        loader: ()=> fetch('https://finzone-server.vercel.app/posts'),
        element: <Home></Home>
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: '/membership',
        element: <PrivateRoute><Membership></Membership></PrivateRoute>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <SignUp></SignUp>
      },
      {
        path: '/post/:id',
        element: <PostDetails></PostDetails>,
        loader: ({ params }) => fetch(`https://finzone-server.vercel.app/post/${params.id}`)
      }

    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      // normal user routes
      {
        path: 'userProfile',
        element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
      },
      {
        path: 'addPost',
        element: <PrivateRoute><Addpost></Addpost></PrivateRoute>
      },
      {
        path: 'myPost',
        element: <PrivateRoute><MyPosts></MyPosts></PrivateRoute>
      },
      {
        path: 'postComments/:id',
        element: <PrivateRoute><SinglePostComments></SinglePostComments></PrivateRoute>
      },

      // admin only routes
      {
        path: 'adminProfile',
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: 'manageUsers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'createAnnouncement',
        element: <AdminRoute><CreateAnnouncement></CreateAnnouncement></AdminRoute>
      },
      {
        path: 'report',
        element: <AdminRoute><ReportedComments></ReportedComments></AdminRoute>
      },


    ]
  }

]);