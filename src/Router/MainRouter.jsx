import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Layouts/Home";
import Result from "../Components/Result/Result";
import Login from "../Components/Auth/Login";
import Layout from "../Layouts/Layout"
import UploadResult from "../Components/Upload/UploadResult";
import PrivateRoute from "../Router/PrivateRoute"
import Single from "../Components/Upload/Single";
import Upload from "../Components/Upload/Upload";
import UploadStudent from "../Components/Upload/UploadStudent";
import UploadResult1 from "../Components/Upload/UploadResult1";

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
            {
                path: '/edit',
                element: <Single></Single>,
            },
            {
                path: '/add',
                element: <Upload></Upload>,
            },
            {
                path: '/upload-student-info',
                element: <PrivateRoute><UploadStudent></UploadStudent></PrivateRoute>,
            },
            {
                path: '/upload-result-info',
                element: <PrivateRoute><UploadResult1></UploadResult1></PrivateRoute>,
            },
        ]
    },
]);

export default router;