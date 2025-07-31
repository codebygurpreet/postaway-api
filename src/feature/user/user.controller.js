// importing required packages
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = UserModel.signUp(name, email, password);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user
      });

    } catch (err) {
      next(err);
    }
  }

  signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = UserModel.signIn(email, password);

      const token = jwt.sign(
        { userID: user.id, email: user.email },
        "x8T0Gv2zmfOgOAa2tCcvLOaaOPuI2roE",
        { expiresIn: "1h" }
      );

      return res.status(200).send(token);

    } catch (err) {
      next(err);
    }
  }
}
