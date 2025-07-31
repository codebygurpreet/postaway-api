// importing required packages
import ApplicationError from "../../../utils/applicationError.js";

let users = [
  { id: 1, name: 'Gurpreet Singh', email: 'gurri1@gmail.com', password: 'password1' },
  { id: 2, name: 'Gurpreet Singh', email: 'gurri2@gmail.com', password: 'password2' },
];

export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static signUp(name, email, password) {
    const exists = users.find(user => user.email === email);

    if (exists) throw new ApplicationError("User already exists with this email", 400);

    const newUser = new UserModel(users.length + 1, name, email, password);
    users.push(newUser);
    return newUser;
  }

  static signIn(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) throw new ApplicationError("Invalid credentials", 400);
    return user;

  }

  static getAllUser() {
    return users;
  }
}
