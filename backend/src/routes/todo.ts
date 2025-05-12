import { Router, type Request, type Response } from "express";
import {Todo} from "../db"
import userAuth from "../middleware/user";
const todoRouter = Router();


todoRouter.post('/create',userAuth,async(req:Request,res:Response)=>{
try {
    if(!req.body.title)
    {
        res.status(403).json('Enter Todo');
        return;
    }
    const {title} = req.body;
   
    if(!req.user)
        {
            res.status(401).json({message:'User not authorised'})
            return
        }
    const user_id = req.user;
    const timeLapsed = Date.now();
    const today = new Date(timeLapsed);
    await Todo.create({
        title,user_id,created_on:today.toDateString()
    })

    res.status(200).json({message:'Todo Created'});
} catch (error) {
    res.status(403).json({message:'Invalid user or Invalid format'})
    console.log("Error :",error)
}
})

todoRouter.delete('/delete',userAuth,async(req,res)=>{
    try{
        
        if(!req.user)
        {
            res.status(401).json({message:'User not authorised'})
            return
        }
        const user_id = req.user;
        if(!req.query.id)
        {   
            res.status(403).json({message:"Id is not provided"})
            return;
        }
        const id = req.query.id;
        const todo = await Todo.find({user_id,_id:id})
        if(!todo)
        {
            res.status(404).json({message:"Todo not found"});
        }
        await Todo.deleteOne({user_id,_id:id})
        res.status(200).json({message:"Todo deleted"})
    }
    catch(error)
    {
        console.log("Error: ",error)
        res.status(403).json({message:'Error while deleting todo'});
        return
    }
})

todoRouter.put('/edit',userAuth,async(req,res)=>{
    try {
        
        
        if(!req.user)
        {
            res.status(401).json({message:'User not authorised'})
            return
        }
        const user_id = req.user;
        if(!req.query.id)
        {   
            res.status(403).json({message:"Id is not provided"})
            return;
        }
        const id = req.query.id;
        
        const {title} = req.body;

        const todo = await Todo.findOne({user_id,_id:id});
        
        if(!todo)
        {
            res.status(403).json({message:'Cannot find the todo'})
            return;
        }

        await Todo.updateOne({user_id,_id:id},{$set:{title}});
        
        res.status(200).json({message:"Todo updated"});

    } catch (error) {
        res.status(403).json({message:'Error while updating the todo'});
        console.log('Error: ',error)
    }
})

todoRouter.put('/toggle',userAuth,async(req:Request,res:Response)=>{
    try {
        
        
        if(!req.user)
        {
            res.status(401).json({message:'User not authorised'})
            return
        }
        const user_id = req.user;
        if(!req.query.id)
        {   
            res.status(403).json({message:"Id is not provided"})
            return;
        }
        const id = req.query.id;
        
        const {done} = req.body;

        const todo = await Todo.findOne({user_id,_id:id});
        
        if(!todo)
        {
            res.status(403).json({message:'Cannot find the todo'})
            return;
        }

        await Todo.updateOne({user_id,_id:id},{$set:{done}});
        
        res.status(200).json({message:"Todo updated"});

    } catch (error) {
        res.status(403).json({message:'Error while updating the todo'});
        console.log('Error: ',error)
    }
})

todoRouter.get('/',userAuth,async(req,res)=>{
    try {
        if(!req.user)
        {
             res.status(401).json({message:'User not authorised'})
            return
        }
        const user_id = req.user;

        const todos = await Todo.find({user_id});
        if(!todos)
        {
            res.json(404).json({message:'No todo found'});
            return;
        }
        res.status(200).json({todos}) 
    } catch (error) {
         res.status(403).json({message:'Error while fetching the todo'});
        console.log('Error: ',error)
    }
})

export default todoRouter;