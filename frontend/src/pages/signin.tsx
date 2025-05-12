import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const signinSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password should be minimum 8 length")
    .max(20, "Password should not be more than 20 length"),
});

type formFields = z.infer<typeof signinSchema>;

const SignIn = () => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<formFields>({
    resolver: zodResolver(signinSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<formFields> = async (data: formFields) => {
    try {
      const result = signinSchema.safeParse(data);
      if (result.success) {
        const response = await axios.post("/api/user/signin", data);
        localStorage.setItem('token',response.data.accessToken);
        reset();
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 401:
            setError("password", { message: "Invalid Password" });
            break;
          case 404:
            setError("root", { message: "User doesn't exsist." });
            break;
          case 500:
            setError("root", { message: "Internal Server Error" });
        }
      } else {
        setError("root", { message: "Something went wrong." });
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-between ">
        <div className="flex flex-col gap-3  items-center">
          <h1>Get Started with TickTickBoom</h1>
        </div>
        <div className=" flex items-start w-1/2 border">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Email</label>
              <input
                {...register("email")}
                type="text"
                placeholder="john@gmail.com"
              />
            </div>
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="">Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="************"
              />
            </div>
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
            <div>
              <button type="submit">
                <p>{isSubmitting ? "Submitting" : "Submit"}</p>
              </button>
            </div>
            {errors.root && <div>{errors.root.message}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
