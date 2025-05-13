import Router, {  type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../db';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import userAuth from '../middleware/user';

const userRouter = Router();
const saltRound :number = 10;

const accessSecret:string = String(process.env.ACCESS_TOKEN_SECRET);
const refreshTokenSecret = String(process.env.REFRESH_TOKEN_SECRET);

userRouter.use(cookieParser());

userRouter.post('/signup',async(req:Request,res:Response):Promise<void>=>{
    try{
        const{firstname,lastname,email,password} = req.body;
        const exsistingUser = await User.findOne({email});
        if(exsistingUser)
        {
            res.status(409).json({
                message:'User already exsist.'
            })
            return;
        }
        const hassedPassword = await bcrypt.hash(password,saltRound);
        await User.create({
            email,password:hassedPassword,firstname,lastname
        })

        res.status(200).json({message:'Signup Successfully'})

    }catch(err){
            res.status(500).json({message:'Internal Server Error.'})
            return;
    }
});


userRouter.post('/signin',async (req:Request,res:Response):Promise<void>=> {
    try{
        const{email,password} = req.body;
        const user = await User.findOne({email})
        if(!user)
        {
            res.status(404).json({message:'User does not exsist'});
            return;
        }

        const match = await bcrypt.compare(password,user.password)
        if(!match)
        {
            res.status(401).json({message:'Invalid email or password'});
            return;
        }

        const refreshToken = jwt.sign({id:user._id},refreshTokenSecret,{expiresIn:'15d'})
        const accessToken = jwt.sign({id:user._id},accessSecret,{expiresIn:'1h'})
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            sameSite:'none',secure:true,
            maxAge:30*24*60*60*1000
        })

        res.status(200).json({message:'SignIn Successfully',
            user,
            refreshToken,  
            accessToken
        })

    }catch(err){
        res.status(500).json({message:'Internal Server Error'})
    }
});


userRouter.post('/refresh',async(req,res):Promise<void>=>{
    try {
        if(!req.cookies.refreshToken)
        {
            res.status(401).json({message:'Unauthorised user not refresh token'});
            return;
        }
        const refreshToken = req.cookies.refreshToken;

        const decodedData = jwt.verify(refreshToken,refreshTokenSecret) as {id:string};

        const newAccessToken = jwt.sign({id:decodedData.id},accessSecret,{expiresIn:'1h'});

        res.status(200).json({accessToken:newAccessToken});
    } catch (error) {
        console.log(error);
        res.status(403).json({message:'Invalid or expired refresh token'});

    }
})

userRouter.post('/logout',userAuth,(req:Request,res:Response):void=>{
    try{
        res.clearCookie('refreshToken');
        res.status(200).json({message:'Logout Successfully'});
    }catch(err){
        res.status(500).json({message:'Internal Server Error'});
        return;
    }
})

export default userRouter;

