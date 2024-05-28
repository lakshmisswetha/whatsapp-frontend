import React from "react";
import { Navigate, createBrowserRouter, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

const { user } = useSelector((state: any) => state.user);
const { token } = user;

export const App = createBrowserRouter([
    {
        path: "/",
        element: !token ? <Login /> : <Navigate to="/home" />,
    },
    {
        path: "/register",
        element: !token ? <Register /> : <Navigate to="/home" />,
    },
    {
        path: "/home",
        element: token ? <Home /> : <Navigate to="/" />,
    },
]);
