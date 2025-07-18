import UserModel from "./user.model.js";

export default class UserController{

    signUp(req,res){
        const {name,email,password} = req.body;
        const newUser = UserModel.signUp(name,email,password);
        if (newUser){
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        }else{
            res.status(400).send("User already exists")
        }
    }
    
    signIn(req,res){
        const {email,password} = req.body;
        const user = UserModel.signIn(email,password);
        if (user) {
            res.status(200).json({ message: 'user logged In', user: user });
        }else{
            res.status(400).send("Invalid Credentials")
        }
    }

}