import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    User,
    Mail,
    Lock,
    Leaf,
    Facebook,
    Twitter,
    ArrowLeft,
} from "lucide-react";
import { register } from "../services/api";

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { name, email, password } = formData;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // The backend sends back { token, role }
            const { data } = await register({ name, email, password });
            localStorage.setItem("token", data.token);

            // --- CORRECTED LOGIC ---
            // We check data.role directly, not data.user.role
            if (data.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }
            // We reload the page to ensure the Navbar updates correctly
            window.location.reload();

        } catch (err) {
            setError(
                err.response?.data?.msg || "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md mb-2 text-center">
                        <div className="flex items-center justify-between space-x-2 mb-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-full">
                                    <Leaf className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    NutriTrack
                                </span>
                            </div>
                            <Link
                                to="/"
                                className="flex items-center text-black-400 hover:text-green-400 transition-colors duration-300 group"
                            >
                                <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                                <span>Back</span>
                            </Link>
                        </div>
                        <h2 className="text-m mt-4 font-bold text-gray-900">
                            Start your journey to a healthier you today
                        </h2>
                    </div>
                    <form className="space-y-6" onSubmit={onSubmit}>
                        {error && (
                            <p className="text-red-500 text-center bg-red-100 p-3 rounded-md text-sm">
                                {error}
                            </p>
                        )}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                name="name"
                                type="text"
                                value={name}
                                onChange={onChange}
                                required
                                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                name="email"
                                type="email"
                                value={email}
                                onChange={onChange}
                                required
                                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={onChange}
                                required
                                minLength="6"
                                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                                placeholder="Password (min. 6 characters)"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                    <div className="mt-1 text-center text-sm text-gray-500">
                        <p>
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-green-600 hover:text-green-500"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
