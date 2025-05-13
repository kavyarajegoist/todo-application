import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from 'axios'

import { z } from "zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    firstname: z.string().min(1,"Firstname is required").max(10),
    lastname: z.string().min(1,"Lastname is required").max(10),
    email: z.string().email("Invalid email format."),
    password: z.string().min(6,"Password must be atleast 6 characters")
})

type FormFields = z.infer<typeof schema>;


const SignUp = () => {

const {register,reset,handleSubmit,formState:{errors,isSubmitting}} = useForm<FormFields>({
    resolver:zodResolver(schema)
})
const navigate = useNavigate();
const onSubmit : SubmitHandler<FormFields> = async(data:FormFields)=>{
    const result = schema.safeParse(data)
    if(result.success){
        const response = await axios.post("/api/user/signup",result.data)
        console.log(response.status + response.data.message)
        reset();
        navigate('/signin');
          
    }


}
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">Sign up</h1>
          <p className="text-gray-500 mb-8">Create your account to get started</p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstname" className="font-medium">Firstname</label>
              <input {...register("firstname")}
                id="firstname"
                type="text"
                placeholder="John"
                className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base bg-gray-50"
              />
              {errors.firstname && (<div className="text-red-500 text-sm mt-1">{errors.firstname.message}</div>)}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastname" className="font-medium">Lastname</label>
              <input {...register("lastname")}
                id="lastname"
                type="text"
                placeholder="Doe"
                className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base bg-gray-50"
              />
              {errors.lastname && (<div className="text-red-500 text-sm mt-1">{errors.lastname.message}</div>)}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">Email</label>
              <input {...register("email")}
                id="email"
                type="text"
                placeholder="john@example.com"
                className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base bg-gray-50"
              />
              {errors.email && (<div className="text-red-500 text-sm mt-1">{errors.email.message}</div>)}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-medium">Password</label>
              <input {...register("password")}
                id="password"
                type="password"
                placeholder="***********"
                className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base bg-gray-50"
              />
              {errors.password && (<div className="text-red-500 text-sm mt-1">{errors.password.message}</div>)}
            </div>
            <button
              className="bg-black rounded-lg w-full text-center px-2 py-3 cursor-pointer text-white text-lg font-semibold hover:bg-black/80 transition-all"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "...Loading" : "Sign Up"}
            </button>
          </form>
          <div className="text-center mt-6 text-gray-600 text-base">
            Already have an account?{' '}
            <a href="/signin" className="text-purple-600 font-medium hover:underline">Sign in</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
