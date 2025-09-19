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
        ]
    },
]);

export default router;