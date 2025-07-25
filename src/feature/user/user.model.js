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
    if (exists) return null;

    const newUser = new UserModel(users.length + 1, name, email, password);
    users.push(newUser);
    return newUser;
  }

  static signIn(email, password) {
    return users.find(user => user.email === email && user.password === password) || null;
  }
}
