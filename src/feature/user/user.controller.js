import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await UserModel.signUp(name, email, password);

      if (!user) {
        return res.status(400).json({ message: "User already exists" });
      }

      return res.status(201).json({
        message: "User registered successfully",
        user
      });

    } catch (err) {
      console.error("SignUp Error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.signIn(email, password);

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userID: user.id, email: user.email },
        "x8T0Gv2zmfOgOAa2tCcvLOaaOPuI2roE",
        { expiresIn: "1h" }
      );

      return res.status(200).send(token);

    } catch (err) {
      console.error("SignIn Error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
