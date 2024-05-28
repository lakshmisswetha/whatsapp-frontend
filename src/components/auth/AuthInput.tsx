import React from "react";

const AuthInput = ({ name, type, placeholder, register, error }) => {
    return (
        <div className="mt-8 content-center space-y-1">
            <label htmlFor={name} className="text-sm font-bold tracking-wide">
                {placeholder}
            </label>
            <input
                className="w-full px-4 py-2 rounded-lg outline-none text-base"
                type={type}
                placeholder={placeholder}
                {...register(name)}
            />
            {error && <p className="text-red-400">{error}</p>}
        </div>
    );
};

export default AuthInput;
