// importing required packages
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export default class UserController {
  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = UserModel.signUp(name, email, hashedPassword);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user
      });

    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = UserModel.signIn(email);

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userID: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).send(token);

    } catch (err) {
      next(err);
    }
  }
}
