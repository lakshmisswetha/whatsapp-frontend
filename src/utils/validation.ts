import * as Yup from "yup";

export const signUpSchema = Yup.object({
    name: Yup.string()
        .required("Name is required")
        .matches(/^[a-zA-Z_]*$/, "No special characters allowed")
        .min(2, "Name must be between 2 and 16 characters")
        .max(16, "Name must be between 2 and 16 characters"),
    email: Yup.string().required("email address is required").email("invalid email address"),
    status: Yup.string().max(64, "Must be less than 64 characters."),
    password: Yup.string().required("password is required"),
});
export const signInSchema = Yup.object({
    email: Yup.string().required("email address is required").email("invalid email address"),
    password: Yup.string().required("password is required"),
});
