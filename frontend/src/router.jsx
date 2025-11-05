import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Verify from "./pages/Verify";
import MOrders from "./pages/MOrders";



const router=createBrowserRouter([

    {path:'/' , element:<App/>,
        children:[
            {path:'/' , element:<Home/>},
            {path:'cart' , element:<Cart/>},
            {path:'order' , element:<PlaceOrder/>},
            {path:'verify' , element:<Verify/>},
            {path:'my-order' , element:<MOrders/>},

        ]
    }

]) 

export default router;