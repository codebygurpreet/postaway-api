import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApplicationError from "../../../utils/applicationError.js";

export default class UserController {
  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new ApplicationError("All fields are required", 400);
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await UserModel.signUp(name, email, hashedPassword);
      if (!user) {
        throw new ApplicationError("User already exists with this email", 409);
      }

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new ApplicationError("Email and password are required", 400);
      }

      const user = await UserModel.signIn(email);
      if (!user) {
        throw new ApplicationError("User not Found", 404);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new ApplicationError("Invalid credentials", 401);
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
