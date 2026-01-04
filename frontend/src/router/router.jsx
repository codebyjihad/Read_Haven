import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../components/Home";

const router = createBrowserRouter([
    {
        path:'/',
        Component:Root,
        hydrateFallbackElement:<p>Loading...</p>,
        children:[
            {
                index:true,
                element:<Home/>
            }
        ]
    }
])

export default router