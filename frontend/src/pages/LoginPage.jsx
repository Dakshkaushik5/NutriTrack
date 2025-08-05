import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {HeartIcon} from "@heroicons/react/24/solid";
import {
	Eye,
	EyeOff,
	User,
	Mail,
	Lock,
	MapPin,
	Leaf,
	Facebook,
	Twitter,
	ArrowLeft,
} from "lucide-react";
import {login} from "../services/api";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({email: "", password: ""});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const {email, password} = formData;

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const onChange = (e) =>	setFormData({...formData, [e.target.name]: e.target.value});

	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
	try {
		const {data} = await login(formData);
		localStorage.setItem("token", data.token);
		// Redirect based on user role
		if (data.role === "admin") {
			navigate("/admin/dashboard"); // Redirect admins to admin dashboard
		} else {
			navigate("/dashboard"); 
			// Redirect regular users to user dashboard
		}
		window.location.reload(); // Reload the page to update the UI
	} catch (err) {
		setError(err.response?.data?.msg || "Login failed. Please try again.");
	}
};


	

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow-xl rounded-3xl sm:px-10">
					<div className="flex items-center justify-between space-x-2 mb-8">
						<div className="flex items-center gap-2">
							<div className="bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-full">
								<Leaf className="h-6 w-6 text-white" />
							</div>
							<span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
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
					<form className="space-y-6 mt-2" onSubmit={onSubmit}>
						{error && (
							<p className="text-red-500 text-center bg-red-100 p-3 rounded-md text-sm">
								{error}
							</p>
						)}
						{/* Email Input */}
						<div className="relative">
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<Mail className="h-5 w-5 text-gray-400" />
							</div>
							<input
								id="email"
								name="email"
								type="email"
								value={email}
								onChange={onChange}
								required
								className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
								placeholder="Email address"
							/>
						</div>
						{/* Password Input */}
						<div className="relative">
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<Lock className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								value={password}
								onChange={onChange}
								required
								className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
								placeholder="Password"
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
								Login
							</button>
						</div>
					</form>
					<div className="mt-6">
					<div className="relative">
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-gray-50 text-gray-500">
								Don't have an account?
							</span>
							<Link
								to="/signup"
								className="font-medium text-green-600 hover:text-green-500"
							>
								Sign up
							</Link>
						</div>
					</div>
				</div>
					{/* Social Login */}
					<div className="pt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">
									Or continue with
								</span>
							</div>
						</div>

						<div className="mt-6 flex justify-center space-x-4">
							<button
								type="button"
								className="p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
							>
								<Facebook className="h-6 w-6 text-blue-600" />
							</button>
							<button
								type="button"
								className="p-3 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
							>
								<div className="h-6 w-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded text-white flex items-center justify-center text-sm font-bold">
									G
								</div>
							</button>
							<button
								type="button"
								className="p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
							>
								<Twitter className="h-6 w-6 text-blue-400" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
