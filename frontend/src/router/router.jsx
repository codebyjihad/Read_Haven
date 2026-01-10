import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Ebooks from "../pages/Ebooks";
import MemberShip from "../pages/MemberShip";
import Addbooks from "../pages/Addbooks";
import Shop from "../pages/shop/Shop";
import EditBooks from "../pages/shop/EditBooks";
import BookDeitals from "../pages/shop/BookDeitals";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        hydrateFallbackElement: <p>Loading...</p>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/books',
                element: <Shop/>,
            },
            {
                path: '/ebooks',
                element: <Ebooks />
            },
            {
                path: '/membership',
                element: <MemberShip />
            },
            { 
              path:`/books/edit/:id`,
              element:<EditBooks/>
            },
            {
                path:'/books/:id',
                element:<BookDeitals/>
            },
            {
                path: '/books/add',
                element: <Addbooks />
            }
        ]
    }
])

export default router