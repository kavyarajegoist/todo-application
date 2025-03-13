import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
const schema = z.object({
    firstname: z.string().min(1,"Firstname is required").max(10),
    lastname: z.string().min(1,"Lastname is required").max(10),
    email: z.string().email("Invalid email format."),
    password: z.string().min(6,"Password must be atleast 6 characters")
})

type FormFields = z.infer<typeof schema>;


const SignUp = () => {

const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<FormFields>({
    resolver:zodResolver(schema)
})

const onSubmit : SubmitHandler<FormFields> = async(data:FormFields)=>{
    const result = schema.safeParse(data)
    if(result.success){
        console.log(data    )
    }

}
  return (
    <>
      <div className="flex flex-col items-center justify-center  mt-20">
        <div className="-z-10 absolute top-0 min-h-screen  ">
          <img
            src="src/assets/pexels-breakingpic-3243.jpg"
            alt=""
            className="w-screen h-screen  "
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}  className="  flex flex-col justify-center gap-4 items-center w-[600px] h-[500px] my-auto mx-auto rounded-md shadow-md  bg-while/30 backdrop-blur-md ">
          <h1 className="text-3xl tracking-tighter">Sign up</h1>
          <div className="flex flex-col w-[60%] gap-1 ">
            <p>Firstname</p>
            <input {...register("firstname")}
              type="text"
              placeholder="Trump"
              className="p-2 rounded-lg"
            /> {errors.firstname && (<div className="text-red-500">{errors.firstname.message}</div>)}
          </div>
         
          <div className="flex flex-col w-[60%] gap-1 ">
            <p>Lastname</p>
            <input {...register("lastname")}
              type="text"
              placeholder="Donald"
              className="p-2 rounded-lg"
            /> {errors.lastname && (<div className="text-red-500">{errors.lastname.message}</div>)}

          </div> 
          <div className="flex flex-col w-[60%] gap-1 ">
            <p>Email</p>
            <input {...register("email")}
              type="text"
              placeholder="example@email.com"
              className="p-2 rounded-lg"
            />{errors.email && (<div className="text-red-500">{errors.email.message}</div>)}
          
          </div> 

          <div className="flex flex-col w-[60%] gap-1 ">
                <p>Password</p>
                <input {...register("password")} type="text" placeholder="***********"  className="p-2 rounded-lg items-center"/>
                {errors.password && (<div className="text-red-500">{errors.password.message}</div>)}

            </div>          <button className="bg-blue-500 rounded-lg w-[60%] text-center px-2 py-2 cursor-pointer" type="submit" disabled={isSubmitting}>
            <p>{isSubmitting?"...Loading":"Submit"}</p>
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
