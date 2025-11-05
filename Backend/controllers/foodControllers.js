import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add Food item

const addFood = async (req, res) => {
  const image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try{

    await food.save();
    res.json({success : true , message : "Food Saved"})

  }catch(error){

    console.log(error);
    res.json({success : false, message : "Error Occured"})


  }
};


// all food list 

const listFood = async(req,res)=>{
try {
    const foodItem = await foodModel.find({});
    res.json({foodItem})


} catch (error) {
    res.json({message :"Error"})
}

}

//remove 

const removeFood = async(req,res)=>{
    try{
      const food = await foodModel.findOne({_id:req.body.id});
      fs.unlink(`uploads/${food.image}` , ()=>{});
      
      await foodModel.findByIdAndDelete(req.body.id);

      
      res.json({message :"Item have been remove"})
    }catch(error){
         res.json({message: "Error ocurred"})
         console.log(error);
    }
}

export { addFood , 
    listFood,
    removeFood
 };
