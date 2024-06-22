import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
const Login = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const { signUpWithGmail, login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const from = location.state?.from?.pathname || "/";

  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/users", userInfor).then((response) => {
          // console.log(response);
          alert("Signin successful!");
          navigate(from, { replace: true });
        });
        // console.log(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterrorMessage("Please provide valid email & password!");
      });
    reset();
  };

  // login with google
  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic.post("/users", userInfor).then((response) => {
          // console.log(response);
          alert("Signin successful!");
          navigate("/");
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="flex items-center justify-center w-full max-w-md mx-auto my-20 bg-white shadow">
      <div className="mb-5">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-lg font-bold">Please Login!</h3>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            <label className="label">
              <a href="#" className="mt-2 label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* show errors */}
          {errorMessage ? (
            <p className="text-xs italic text-red">
              Provide a correct username & password.
            </p>
          ) : (
            ""
          )}

          {/* submit btn */}
          <div className="mt-4 form-control">
            <input
              type="submit"
              className="text-white btn bg-green"
              value="Login"
            />
          </div>

          {/* close btn */}
          <Link to="/">
            <div className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
              ✕
            </div>
          </Link>

          <p className="my-2 text-center">
            Donot have an account?
            <Link to="/signup" className="ml-1 underline text-red">
              Signup Now
            </Link>
          </p>
        </form>
        <div className="space-x-3 text-center">
          <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-green hover:text-white"
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
