import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User Not present" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid Creditnal" });
    const token = createToken(user._id);
    res.json({ success: true,message:"Login in", token: token });
  } catch (error) {
    res.json({ error: error, success: false });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_S);
};

//register User
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const exist = await userModel.findOne({ email: email });
    if (exist)
      return res.json({ message: "Email already Exist", success: false });

    //validating the email and the password using validator

    if (!validator.isEmail(email))
      return res.json({ message: "Enter a valid Email", success: false });
    if (password.length < 8)
      return res.json({
        message: "Please enter strong password",
        success: false,
      });

    //hashin the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await userModel({
      name: name,
      email: email,
      password: hashedPass,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, message: "register", token: token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
