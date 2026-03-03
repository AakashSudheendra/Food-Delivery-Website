import jwt from "jsonwebtoken"

const isAuth=async (req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(400).json({
                message:"Token Not found"
            })
        }
        const decodedToken=await jwt.verify(token,process.env.SECRET_TOKEN)
        if(!decodedToken){
            return res.status(400).json({
                message:"Token not Verified"
            })
        }
        console.log(decodedToken)
        req.userId=decodedToken.userId
        next()
    } catch (error) {   
        return res.status(400).json({message:"isAuthError"})
    }
}

export default isAuth