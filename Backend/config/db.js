import mongoose from "mongoose"

const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Db Connected in username : ${process.env.MONGODB_USER} `)
    } catch (error) {
        console.log(error)
    }
}

export default connectDb