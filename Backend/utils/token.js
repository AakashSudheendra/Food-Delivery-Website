import jwt from "jsonwebtoken"

const generatetoken=async (userId)=>{
    try {
        const token =await jwt.sign({userId},process.env.SECRET_TOKEN,{expiresIn:"7d"})
        return token
    } catch (error) {
        console.log(error)
    }
}

export default generatetoken