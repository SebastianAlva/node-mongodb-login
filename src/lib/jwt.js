
import jwt from "jsonwebtoken"

export function createAccessToken(payload){
    return new Promise((resolve,reject)=>{
        //se crea un token 
        jwt.sign(
            payload, 
            "some secret", 
            {
                expiresIn: "1d"
            },
            //en caso de que exista un error, se printea el error, si funciona se printea el token
            (err, token) => {
                if (err) { reject(err) };
                resolve(token)
            })
    })
}