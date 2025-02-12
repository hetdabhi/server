import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
   try {
      const userData = new User(req.body);
      console.log(userData);
      if (!userData) {
         res.status(404).json({ msg: "user not found" });
      }

      await userData.save();
      res.status(200).json({ msg: "user got created successfully" });
   } catch (error) {
      res.status(500).json({ err: error });
   }
};

export const getAll = async (req, res) => {
   try {
      const userData = await User.find();
      if (!userData) {
         res.status(404).json({ message: "User not found." });
      }
      res.status(200).json(userData);
   } catch (error) {
      res.status(500).json({ err: error });
   }
};

export const findUserById = async (req, res) => {
   try {
      const userid = req.params.id;
      const userData = await User.findById(userid);
      if (!userData) {
         res.status(404).json({ message: "User not found." });
      }
      res.status(200).json(userData);
   } catch (error) {
      res.status(500).json({ err: error });
   }
};

export const Updateuser = async (req, res) => {
   try {
      const userid = req.params.id;
      const userData = await User.findById(userid);
      if (!userData) {
         res.status(404).json({ message: "User not found." });
      }
      const updatedata = await User.findByIdAndUpdate(userid, req.body, { new: true });
      res.status(200).json({ msg: "User Updated successfully" });
   } catch (error) {
      res.status(500).json({ err: error });
   }
};

export const DeleteUser = async (req, res) => {
   try {
      const userid = req.params.id;
      const userData = await User.findById(userid);
      if (!userData) {
         res.status(404).json({ message: "User not found." });
      }
      const deleteData = await User.findByIdAndDelete(userid);
      res.status(200).json({ msg: "User Deleted Successfully" });
   } catch (error) {
      res.status(500).json({ err: error });
   }
};

// ***************************** USER AUTHORIZATION AND AUTHENTICATION ************************************

export const register = async (req, res) => {
   try {
      const { name, email, password, age } = req.body;
      if (!name || !email || !password || !age) {
         res.status(404).json({ msg: "All Fields Are Required" });
      }
      console.log(password);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);

      const newuser = new User({
         name,
         email,
         password: hashedPassword,
         age
      });
      await newuser.save();
      res.status(200).json({ msg: "User Registered Successfully" });
   } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
   }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
   try {
      const user = await User.findById(req.user.id);
      if (!user) {
         return res.status(404).json({ msg: "User Not Found" });
      }
      user.token = "";
      await user.save();
      res.status(200).json({ msg: "Logout Successfully" });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
};