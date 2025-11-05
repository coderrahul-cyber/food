import { createContext, useEffect, useState } from "react";
import axios from 'axios'



export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000";


    const [cardItem, setCardItem] = useState({});
    const [token, setToken] = useState('');
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {

        if (!cardItem[itemId]) {
            setCardItem((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCardItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if(token){
            await axios.post(`${url}/api/cart/add `, {itemId} , {headers : {token : token}} )
            console.log("add")
        }
    }

    const removeFromCart = async (itemId) => {
        setCardItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token){
            await axios.post(`${url}/api/cart/remove` , {itemId} , {headers : {token : token}});
            console.log("remove")
        }
    }




    const getCartTotal = () => {

        let TotalAmount = 0;
        for (const items in cardItem) {
            if (cardItem[items] > 0) {

                let itemInfo = food_list.find((product) => product._id === items);

                TotalAmount += itemInfo.price * cardItem[items];
            }
        }

        return TotalAmount;

    }

    const fetchFoodList = async () => {
        const respose = await axios.get(`${url}/api/food/list`);

        setFoodList(respose.data.foodItem)

    }

    const fetchCartData = async (token)=>{
        
        try {
            // console.log("Token being sent:", token);
            const response = await axios.get(`${url}/api/cart/get`, {
                headers: { token: token },
            });
            // console.log("Response from getCart:", response.data);
            setCardItem(response.data.cart)
        } catch (error) {
            console.error("Error loading cart data: ", error);
        }
    
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList(); // Fetch food items
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                fetchCartData(storedToken)
            }
        }
        loadData();
    }, []);






    const contextValue = {
        url,
        cardItem,
        setCardItem,
        addToCart,
        removeFromCart,
        food_list,
        getCartTotal,
        token,
        setToken

    };




    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;



