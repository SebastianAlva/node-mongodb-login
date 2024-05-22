
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { createAccessToken } from "../lib/jwt.js"
export const register = async (req, res) => {

    //se reciver los valores del registro mediante el register
    const { email, password, username } = req.body
    //se hace un try catch en caso de que funcione
    try {
        // se encripta la contrasena
        const hassedPassword = await bcrypt.hash(password, 10)
        //se crea un usuario con la contrasena encriptada
        const newUser = new User({
            username,
            email,
            password: hassedPassword
        })
        //se guarda en un user
        const UserSaved = await newUser.save()
        const token = await createAccessToken({ id: UserSaved._id })
        res.cookie("token", token)
        res.json({
            id: UserSaved._id,
            username: UserSaved.username,
            email: UserSaved.email,
            ceatedAt: UserSaved.createdAt,
            updatedAt: UserSaved.updatedAt
        })
    } catch (e) {
        console.log("Error: ", e)
    }
}

export const login = async (req, res) => {

    //se reciver los valores del registro mediante el register
    const { email, password } = req.body
    //se hace un try catch en caso de que funcione
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "User not found" })

        const ismatch = await bcrypt.compare(password, userFound.password)

        if (!ismatch) return res.status(400).json({ message: "Incorrect password" });

        const token = await createAccessToken({ id: userFound._id });

        res.cookie("token", token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            ceatedAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (e) {
        res.status(500).json({message: e.nessage})
    }
}

export const logout = (req,res) =>{
    res.cookie("token","",{
        expires: new Date(0)
    });
    return res.sendStatus(200)
}

export const profile = async (req,res) =>{
    const userFound = await User.findById(req.user.id)

    if (!userFound){
        return res.status(400).json({message:"User not found"})
    }
    return res.json({
        id:userFound._id,
        username: userFound.username,
        email:userFound.email,
        createdAt:userFound.createAt,
        updatedat:userFound.updatedAt,
    })
}