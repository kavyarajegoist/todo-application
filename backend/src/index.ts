import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import todoRouter from "./routes/todo";

const dbUrl:string = String(process.env.MONGO_URL);
const port:number = Number(process.env.PORT) || 3000;    
const app = express();

app.use(express.json());

app.use('/api/user',userRouter);
app.use('/api/todo',todoRouter)



await mongoose.connect(dbUrl);
app.listen(port,()=>{
    console.log(`Listening on port ${port} ${dbUrl} `);
})