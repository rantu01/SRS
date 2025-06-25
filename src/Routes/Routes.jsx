import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/LoginPage";
import Register from "../Pages/RegisterPage";
import MainLayout from "../Layout/MainLayout";
import AddService from "../Pages/AddService";
import ServiceDetails from "../Pages/ServiceDetails";
import AllServices from "../Pages/AllServices";
import MyReviews from "../Pages/MyReviews";
import MyServices from "../Pages/MyServices";
import PrivateRoute from "./PrivateRoute";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component : MainLayout ,
      },
      {
        path : "/login",
        element: <Login />,
      },
      {
        path : "/register",
        element: <Register></Register>,
      },
      {
        path : "/add-service",
        element: <PrivateRoute> <AddService></AddService> </PrivateRoute> ,
      },
      {
        path : "/services/:id",
        element:  <ServiceDetails></ServiceDetails> ,
      },
      {
        path : "/all-Services",
        element: <AllServices></AllServices>,
      },
      {
        path : "/my-reviews",
        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute> ,
      },
      {
        path : "/my-service",
        element: <PrivateRoute><MyServices></MyServices></PrivateRoute> ,
      },
    ],
  },
]);