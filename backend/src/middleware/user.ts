import jwt from "jsonwebtoken";
import { type NextFunction, type Request,type Response } from "express";

declare global {
    namespace Express{
        interface Request{
            user:String
        }
    }
}

const accessSecret:string = String(process.env.ACCESS_TOKEN_SECRET);

const userAuth = (req:Request,res:Response,next:NextFunction):any=>{
const authHeader = req.headers.authorization;
    if((!authHeader)||(!authHeader.startsWith('Bearer')))
    {
        res.status(401).json({message:"token is not present or not start with keyword 'Bearer'"})
        return;
    }

    const token = authHeader.split(" ")[1];
try {
    const decodedData = jwt.verify(token,accessSecret) as {id:string};
  
    req.user = decodedData.id;
    next();

} catch (error) {
    return res.status(403).json({message:'Invalid or forbidden token'})
}

}

export default userAuth;