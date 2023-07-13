import userModel from "../schemas/user-session.schema.js";

export default class UserManager {
    constructor() {
        this.userModel = userModel
    }

    async register(firstname, lastname, email, age, password) {
        try {
        let exists = await userModel.findOne({email})

        if(exists) {
            throw new Error("User already exists")
        }

        let user = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            age: parseInt(age),
            password: password
        }

        let registerUser = await userModel.create(user)
        return registerUser
        } catch (error) {
            throw new Error("An error ocurred here" + error)
        }
        
    }

    async login(email, password) {
        const userFind = await userModel.findOne({ email }) 

        if(!userFind) {
            throw new Error("User does not exists")
        }
        if(userFind.password !== password) {
            throw new Error("User exists but password is incorrect")
        }

        return userFind;
    }
}