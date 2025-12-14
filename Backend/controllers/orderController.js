import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY);

// Place orderFrom frontend 
const placeOrder = async(req,res)=>{

    const furl = 'http://localhost:5173';

    try {

        const newOrder = new orderModel({
            userId : req.body.userId ,
            items:req.body.items,
            amount : req.body.amount,
            address : req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId , {cartData : {}});

        const line_items = req.body.items.map((item)=>({
            price_data : {
                currency:"aud",
                product_data:{
                 name:item.name
             },
             unit_amount : item.price*100
             },
            quantity:item.quantity
        }))

        line_items.push({
            price_data : {
               currency:"aud",
               product_data:{
                name:"Delivery Charges"
            },
            unit_amount : 2*100
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode:'payment',
            success_url:`${furl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${furl}/verify?success=false&orderId=${newOrder._id}`,

        })

        res.json({success : true , session_url : session.url});

        
    } catch (error) {
        console.log(error)
        res.json({success : false , Error : error.message});

        
    }


}

const verifyOrders = async(req,res)=>{

    const {orderid , success} = req.body ;
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderid , {payment : true});
    
            res.json({success : true , message : "Paid"});
        }else{
            await orderModel.findByIdAndDelete(orderid);
            res.json({success : false , message:"Notpaid"})
        }
        
    } catch (error) {
        res.json({success : false , message:error.message})

        
    }


}

//user order for frontend
const userOrder= async (req,res)=>{

    try {
        const orders = await orderModel.find({userId : req.body.userId});
        res.json({success : true , data : orders});
        
    } catch (error) {
        res.json({success : false, message: error.message});

        
    }




}

const allOrder =async(req,res)=>{

    try {
        const orders = await orderModel.find({});
        res.json({success : true , data: orders });
    } catch (error) {

        res.json({success : false , message : error.message});

        
    }

}

//Upadting status 
const updateStatus = async (req,res)=>{

    try {
        const order = await orderModel.findByIdAndUpdate(req.body.orderid , {status: req.body.status});
        res.json({success :true , message :"Status updated"})
    } catch (error) {
        console.log(error)
        res.json({success :false , message :"Error"})

        
    }

}

export {
    placeOrder,
    verifyOrders,
    userOrder,
    allOrder,
    updateStatus
}