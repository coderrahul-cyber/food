import express   from 'express';
import cors from 'cors';
import ConnectDb from './config/db.js';
import FoodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js';
import authMiddleware from './middlewares/auth.js';
import orderRouter from './routes/orderRoute.js';

//app config 
const app = express();
const port =4000 ;

//middleware 
app.use(express.json());
app.use(cors());

//DB connection
ConnectDb();

//apiEndPoint 
app.use('/api/food' , FoodRouter);//Food Data
app.use('/api/user' ,userRouter);//For user Login
app.use('/api/cart', cartRouter);//For Cart
app.use('/api/order', orderRouter);//For Order
app.use('/images' , express.static( 'uploads'));// the uploads folder will be exposed in this endpoint


app.get('/' , (req,res)=>{
    res.send("Api is working")
})

app.listen(port  , ()=>{
    console.log(`Server started on http://localhost:${port} `)
});

