export default class UserModel {

    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static signUp(name, email, password) {
        const existingUser = users.find((u)=> {
            return u.email === email
        })
        if (existingUser){
            return null
        }
        const newUser = new UserModel(users.length+1, name, email, password)
        users.push(newUser)
        return newUser
    }

    static signIn(email, password) {
        const isUserFound = users.find((u) => {
            return u.email == email && u.password == password
        })
        return isUserFound ? isUserFound : null;
    }

}

let users = [
    { id: 1, name: 'Gurpreet Singh', email: 'gurri@gmail.com', password: 'password' }
]