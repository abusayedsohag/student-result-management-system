import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Layouts/Home";
import Result from "../Components/Result/Result";
import Login from "../Components/Auth/Login";
import Layout from "../Layouts/Layout"
import UploadResult from "../Components/Upload/UploadResult";
import PrivateRoute from "../Router/PrivateRoute"

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
                path: "/result",
                element: <Result></Result>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: '/upload-result',
                element: <PrivateRoute><UploadResult></UploadResult></PrivateRoute>,
            },
        ]
    },
]);

export default router;