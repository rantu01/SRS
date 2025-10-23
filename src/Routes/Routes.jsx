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
import Promotional from "../Pages/Promotional";
import Pricing from "../Component/Pricing";

// ✅ new imports
import DashboardLayout from "../Layout/DashboardLayout";
import UserDashboard from "../Pages/Dashboard/UserDashboard";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: MainLayout },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/add-service", element: <PrivateRoute><AddService /></PrivateRoute> },
      { path: "/services/:id", element: <ServiceDetails /> },
      { path: "/all-Services", element: <AllServices /> },
      { path: "/promotion", element: <Promotional /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/my-reviews", element: <PrivateRoute><MyReviews /></PrivateRoute> },
      { path: "/my-service", element: <PrivateRoute><MyServices /></PrivateRoute> },
    ],
  },

  // ✅ Dashboard Routes
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      // USER
      { path: "user", element: <UserDashboard /> },
      { path: "user/my-reviews", element: <MyReviews /> },
      { path: "user/my-services", element: <MyServices /> },
      { path: "user/add-service", element: <AddService /> },

      // ADMIN
      { path: "admin", element: <AdminDashboard /> },
      { path: "admin/manage-users", element: <h2>Manage Users</h2> },
    ],
  },
]);
