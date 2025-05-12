import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {type:String,required:true},
    lastname: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const todoSchema = new mongoose.Schema({
    title: {type:String,required:true},
   
    done:{type:Boolean,default:false},
    user_id:{type:mongoose.Types.ObjectId,required:true,ref:'user' },
    created_on:{type:String,required:true}
})

export type IUser = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model<IUser>('user',userSchema);

export type ITodo = mongoose.InferSchemaType<typeof todoSchema>;
export const Todo = mongoose.model<ITodo>('todo',todoSchema);