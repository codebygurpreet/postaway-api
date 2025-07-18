import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {

    signUp(req, res) {
        const { name, email, password } = req.body;
        const newUser = UserModel.signUp(name, email, password);
        if (newUser) {
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } else {
            res.status(400).send("User already exists")
        }
    }

    signIn(req, res) {
        const { email, password } = req.body;
        const result = UserModel.signIn(email, password);
        if (!result) {
            res.status(400).send("Invalid Credentials")
        } else {
            // 1. create token
            const token = jwt.sign(
                {
                    userID: result.id,
                    email: result.email
                },
                "x8T0Gv2zmfOgOAa2tCcvLOaaOPuI2roE"
                ,
                {
                    expiresIn: "1h"
                }
            )

            // 2. send token
            return res.status(200).send(token);
        }
    }

}