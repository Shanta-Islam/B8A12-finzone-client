import {
    createBrowserRouter,
  } from "react-router-dom";
  import Main from "../Layout/Main";
  import Home from "../Pages/Home/Home/Home";
  import Login from "../Pages/Login/Login";
  import SignUp from "../Pages/SignUp/SignUp";
  import Dashboard from "../Layout/Dashboard";
  import Addpost from "../Pages/Dashboard/AddPost/AddPost";
//   import PostDetails from "../Pages/PostDetails/PostDetails";
  import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
  import MyPosts from "../Pages/Dashboard/MyPosts/MyPosts";
  import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
  import CreateAnnouncement from "../Pages/Dashboard/CreateAnnouncement/CreateAnnouncement";
  
  
  
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
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <SignUp></SignUp>
        },
        // {
        //   path: '/post/:id',
        //   element: <PostDetails></PostDetails>,
        //   loader: ({ params }) => fetch(`http://localhost:5000/post/${params.id}`)
        // }
  
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
        
        // admin only routes
        {
          path: 'manageUsers',
          element: <ManageUsers></ManageUsers>
        },
        {
          path: 'createAnnouncement',
          element: <CreateAnnouncement></CreateAnnouncement>
        },
  
  
      ]
    }
  
  ]);