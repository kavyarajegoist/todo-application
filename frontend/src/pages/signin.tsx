import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../context/authProvider";

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
  const { setAccessToken } = useAuth();

  const onSubmit: SubmitHandler<formFields> = async (data: formFields) => {
    try {
      const result = signinSchema.safeParse(data);
      if (result.success) {
        const response = await axios.post("/api/user/signin", data);
        const token = response.data.accessToken;
        localStorage.setItem('token', token);
        setAccessToken(token);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">Sign in</h1>
        <p className="text-gray-500 mb-8">Enter your credentials to access your account</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">Email</label>
            <input
              {...register("email")}
              id="email"
              type="text"
              placeholder="john@example.com"
              className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base bg-gray-50"
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-medium">Password</label>
            <input
              {...register("password")}
              id="password"
              type="password"
              placeholder=""
              className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base bg-gray-50"
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>
            )}
          </div>
          {errors.root && <div className="text-red-500 text-sm">{errors.root.message}</div>}
          <button
            type="submit"
            className="mt-2 bg-black text-white rounded-lg py-3 text-lg font-semibold hover:bg-gray-900 transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="text-center mt-6 text-gray-600 text-base">
          Don't have an account?{' '}
          <a href="/signup" className="text-purple-600 font-medium hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
