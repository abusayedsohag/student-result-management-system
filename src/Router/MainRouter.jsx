import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Layouts/Home";
import Result from "../Components/Result/Result";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        children: [

        ]
    },
    {
        path: "/result",
        element: <Result></Result>,
    },
]);

export default router;