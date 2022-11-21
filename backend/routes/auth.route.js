import express from 'express';
import { User, validateLoginUser, validateRegisterUser } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
   const doc = { ...req.body }

   const error = validateRegisterUser(doc);

   if (error) {
      return res.status(400).json({ message: "fill all the details!" });
   }

   const user = await User.findOne({ email: doc.email });

   if (user) {
      return res.status(400).json({ message: "Email already exists!" });
   }

   else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(doc.password, salt);

      const newUser = new User({
         name: doc.name,
         email: doc.email,
         hash: hash
      });

      await newUser.save();
      res.status(201).json({ message: "user created!" });
   }

});

router.post('/login', async (req, res) => {
   const doc = { ...req.body }

   const error = validateLoginUser(doc);

   if (error) {
      return res.status(400).json({ msg: "Please provide both Email and Passsword!" });
   }

   const user = await User.findOne({
      email: doc.email
   });

   if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
   }

   const isMatch = await bcrypt.compare(doc.password, user.hash);

   if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
   }

   const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: 300 });

   user.hash = undefined;

   res.status(200).json({ msg: "Logged in successfully!", access_token: token, user });
});

export default router;