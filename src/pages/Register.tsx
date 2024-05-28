import React from "react";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center py-2 overflow-y-scroll">
            <div className="flex w-[1600px] mx-auto h-full">
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;
