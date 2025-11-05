import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

const router = createBrowserRouter([
    {path:'/' , 
        element:<App/>,
         children:[
            {path:'add' , element:<Add/>},
            {path:'list' , element:<List/>},
            {path:'order' , element:<Orders/>}
         ]
    }
])

export default router