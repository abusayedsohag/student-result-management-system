import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Layouts/Home";
import Result from "../Components/Result/Result";
import Login from "../Components/Auth/Login";
import Layout from "../Layouts/Layout"
import PrivateRoute from "../Router/PrivateRoute"
import UploadStudent from "../Components/Upload/UploadStudent";
import UploadResult from "../Components/Upload/UploadResult";
import Dashboard from "../Components/Dashboard/Dashboard";
import Students from "../Components/Dashboard/Students";
import Analize from "../Components/Dashboard/Analize";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: "/result/:roll",
                element: <Result></Result>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: '/upload-student-info',
                element: <PrivateRoute><UploadStudent></UploadStudent></PrivateRoute>,
            },
            {
                path: '/upload-result-info',
                element: <PrivateRoute><UploadResult></UploadResult></PrivateRoute>,
            },
            {
                path: '/admin/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    {
                        path: '/admin/dashboard/students-info',
                        element: <PrivateRoute><Students></Students></PrivateRoute>
                    },
                    {
                        path: '/admin/dashboard/analize',
                        element: <PrivateRoute><Analize></Analize></PrivateRoute>
                    },
                ]
            },
        ]
    },
]);

export default router;