import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../app/store";
import { loginUser } from "../../features/userSlice";

const LoginForm = () => {
    const dispatch: typeof store.dispatch = useDispatch();
    const { status, error } = useSelector((state: any) => state.user);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signInSchema),
    });

    const onSubmit = async (values: Record<string, any>) => {
        let res = await dispatch(loginUser({ ...values })).unwrap();

        if (res?.user) {
            navigate("/home");
        } else {
            console.log("out");
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-100">
            <div className="w-full max-w-md space-y-8 p-10 bg-emerald-50 rounded-xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
                    <p className="mt-2 text-sm">Sign In</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    <AuthInput
                        name="email"
                        type="text"
                        placeholder="Email"
                        register={register}
                        error={errors?.email?.message}
                    />

                    <AuthInput
                        name="password"
                        type="text"
                        placeholder="password"
                        register={register}
                        error={errors?.password?.message}
                    />

                    {error ? (
                        <div>
                            <p className="text-red-400">{error}</p>
                        </div>
                    ) : null}
                    <button
                        className="w-full flex justify-center
                         bg-emerald-200 text-gray-700 p-4 rounded-full 
                         tracking-wide font-semibold focus:outline-none
                          hover:bg-emerald-300 shadow-lg cursor-pointer transition ease-induration-300"
                        type="submit"
                    >
                        {status == "loading" ? <PulseLoader size={14} /> : "Sign In"}
                    </button>
                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md">
                        <span>are you a new user ?</span>
                        <Link
                            to="/register"
                            className="hover:underline cursor-pointer transition ease-in duration-300"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
