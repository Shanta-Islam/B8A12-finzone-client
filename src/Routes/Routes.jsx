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
import AllComments from "../Pages/Dashboard/AllComments/AllComments";
import Membership from "../Pages/Membership/Membership";
  
  
  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/membership',
          element: <Membership></Membership>
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
          element: <UserProfile></UserProfile>
        },
        {
          path: 'addPost',
          element: <Addpost></Addpost>
        },
        {
          path: 'myPost',
          element: <MyPosts></MyPosts>
        },
        {
          path: 'postComments/:id',
          element: <AllComments></AllComments>,
          loader: ({params}) => fetch(`https://finzone-server.vercel.app/comment/${params.id}`)
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
  
  
      ]
    }
  
  ]);