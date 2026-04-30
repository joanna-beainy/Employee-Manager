import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import employeeRoutes from "./Routes/EmployeeRoutes.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())


if(process.env.MONGO_URI){
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to MongoDB")
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    }).catch((err) => {
        console.log("MongoDb connection error", err)
    })
}


app.use("/api/employees", employeeRoutes)


