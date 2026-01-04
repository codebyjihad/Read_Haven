import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Books from "../pages/Books";
import Ebooks from "../pages/Ebooks";
import MemberShip from "../pages/MemberShip";
import Addbooks from "../pages/Addbooks";

const router = createBrowserRouter([
    {
        path:'/',
        Component:Root,
        hydrateFallbackElement:<p>Loading...</p>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'/books',
                element:<Books/>
            },
            {
                path:'/ebooks',
                element:<Ebooks/>
            },
            {
                path:'/membership',
                element:<MemberShip/>
            },
            {
                path:'/books/add',
                element:<Addbooks/>
            }
        ]
    }
])

export default router