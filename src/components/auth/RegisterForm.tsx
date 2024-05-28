import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, registerUser } from "../../features/userSlice";
import { store } from "../../app/store";
import Picture from "./Picture";
import axios from "axios";

const RegisterForm = () => {
    const dispatch: typeof store.dispatch = useDispatch();
    const { status, error } = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const [picture, setPicture] = useState<string | Blob>("");
    const [readablePicture, setReadablePicture] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const onSubmit = async (data: any) => {
        let res;
        dispatch(changeStatus("loading"));
        let imageUrl = "";
        if (picture) {
            const imageResponse = await uploadImage();
            if (imageResponse) {
                imageUrl = imageResponse.secure_url;
                res = await dispatch(registerUser({ ...data, picture: imageUrl })).unwrap();
            }
        } else {
            res = await dispatch(registerUser({ ...data, picture: "" })).unwrap();
        }

        if (res.user) {
            navigate("/");
        }
    };

    const uploadImage = async () => {
        let formData = new FormData();
        formData.append("upload_preset", "wma92hnh");
        formData.append("file", picture);
        const { data } = await axios.post(
            "https://api.cloudinary.com/v1_1/ddpumqmkh/image/upload",
            formData
        );
        console.log(data);
        return data;
    };
    return (
        <div className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-100">
            <div className="w-full max-w-md space-y-8 p-10 bg-emerald-50 rounded-xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
                    <p className="mt-2 text-sm">Sign Up</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    <AuthInput
                        name="name"
                        type="text"
                        placeholder="Full name"
                        register={register}
                        error={errors?.name?.message}
                    />
                    <AuthInput
                        name="email"
                        type="text"
                        placeholder="Email"
                        register={register}
                        error={errors?.email?.message}
                    />
                    <AuthInput
                        name="status"
                        type="text"
                        placeholder="status"
                        register={register}
                        error={errors?.status?.message}
                    />
                    <AuthInput
                        name="password"
                        type="text"
                        placeholder="password"
                        register={register}
                        error={errors?.password?.message}
                    />
                    <Picture
                        readablePicture={readablePicture}
                        setReadablePicture={setReadablePicture}
                        setPicture={setPicture}
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
                        {status == "loading" ? <PulseLoader size={14} /> : "Sign Up"}
                    </button>
                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md">
                        <span>have an account ?</span>
                        <Link
                            to="/"
                            className="hover:underline cursor-pointer transition ease-in duration-300"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
