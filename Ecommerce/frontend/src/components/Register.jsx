import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "./common/Layout";
import { apiUrl } from "./common/Http";

function Register() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const password = watch("password");

    const onHandleSubmit = async (data) => {
        try {
            const response = await fetch(`${apiUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.status === 200) {
                toast.success(result.message);
                navigate("/login");
            }

            else {
                const errors = result.errors;
                Object.keys(errors).forEach(field => {
                    setError(field, { type: "server", message: errors[field][0] });
                });
                toast.error(result.message || "Something went wrong");
            }

        }
        catch (error) {
            toast.error("Server error");
        }
    };

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
                <form
                    onSubmit={handleSubmit(onHandleSubmit)}
                    className="w-full max-w-md bg-gray-50 p-8 rounded-2xl shadow-xl transform transition-all duration-500 hover:shadow-2xl"
                >
                    <h2 className="text-3xl font-bold text-center text-[#007595] mb-8 animate-fadeIn">
                        Create Account
                    </h2>

                    {/* Name */}
                    <div className="mb-5">
                        <label className="
            block mb-2 text-sm text-slate-600
            ">
                            Full Name
                        </label>
                        <input
                            {...register("name", {
                                required: "Name is required",
                            })}
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Enter your name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-5">
                        <label className="block mb-2 text-sm text-slate-600">
                            Email Address
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value:
                                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label className="block mb-2 text-sm text-slate-600">
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Minimum 8 characters",
                                },
                            })}
                            type="password"
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Enter password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-slate-600">
                            Confirm Password
                        </label>
                        <input
                            {...register("password_confirmation", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            type="password"
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Confirm password"
                        />
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password_confirmation.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#007595] text-white py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-slate-900 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>

                    <p className="text-center text-sm mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[#007595] font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </Layout>
    );
}

export default Register;