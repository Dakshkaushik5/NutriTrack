import React, {useState} from "react";
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
} from "lucide-react";

const SignupPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		country: "",
	});

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
	};

	const benefits = [
		"Manage your nutrition plans the easy way",
		"Share recipes with your friends and discover new ones",
		"More than 15,000 recipes from around the world",
		"Organize recipes by tag, share it with your friends",
		"Invite your friends to join and start sharing your recipes in a flash",
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
			<div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
				<div className="flex flex-col lg:flex-row min-h-[600px]">
					{/* Left Side - Form */}
					<div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
						{/* Logo */}
						<div className="flex items-center space-x-2 mb-8">
							<div className="bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-full">
								<Leaf className="h-6 w-6 text-white" />
							</div>
							<span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
								Pure Wellness
							</span>
						</div>

						<div className="space-y-6">
							{/* Full Name Input */}
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<User className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type="text"
									name="fullName"
									placeholder="Full Name"
									value={formData.fullName}
									onChange={handleInputChange}
									className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
								/>
							</div>

							{/* Email Input */}
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type="email"
									name="email"
									placeholder="Email Address"
									value={formData.email}
									onChange={handleInputChange}
									className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
								/>
							</div>

							{/* Password Input */}
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									placeholder="Password"
									value={formData.password}
									onChange={handleInputChange}
									className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
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

							{/* Country Select */}
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<MapPin className="h-5 w-5 text-gray-400" />
								</div>
								<select
									name="country"
									value={formData.country}
									onChange={handleInputChange}
									className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white appearance-none"
								>
									<option value="" disabled>
										Select your country
									</option>
									<option value="us">United States</option>
									<option value="ca">Canada</option>
									<option value="uk">United Kingdom</option>
									<option value="au">Australia</option>
									<option value="in">India</option>
									<option value="de">Germany</option>
									<option value="fr">France</option>
									<option value="jp">Japan</option>
									<option value="br">Brazil</option>
									<option value="other">Other</option>
								</select>
							</div>

							{/* Create Account Button */}
							<button
								onClick={handleSubmit}
								className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
							>
								CREATE ACCOUNT
							</button>

							{/* Terms */}
							<p className="text-sm text-gray-500 text-center leading-relaxed">
								By clicking on "Create Account" you are agreeing to the{" "}
								<a
									href="#"
									className="text-orange-500 hover:text-orange-600 underline"
								>
									Terms of Service
								</a>{" "}
								and the{" "}
								<a
									href="#"
									className="text-orange-500 hover:text-orange-600 underline"
								>
									Privacy Policy
								</a>
								.
							</p>

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

							{/* Login Link */}
							<p className="text-center text-gray-600 pt-4">
								Already have an account?{" "}
								<a
									href="/login"
									className="text-orange-500 hover:text-orange-600 font-semibold underline"
								>
									Login
								</a>
							</p>
						</div>
					</div>

					{/* Right Side - Benefits */}
					<div className="lg:w-1/2 bg-gradient-to-br from-orange-100 to-red-100 p-8 lg:p-12 flex flex-col justify-center">
						<div className="space-y-8">
							<div>
								<h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
									Create Account
								</h2>
								<p className="text-xl text-gray-600 mb-8">What you will get?</p>
							</div>

							<div className="space-y-6">
								{benefits.map((benefit, index) => (
									<div key={index} className="flex items-start space-x-4">
										<div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mt-1">
											<div className="w-2 h-2 bg-white rounded-full"></div>
										</div>
										<p className="text-gray-700 leading-relaxed">{benefit}</p>
									</div>
								))}
							</div>

							<div className="pt-8">
								<div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
									<p className="text-lg font-semibold text-gray-800 mb-2">
										🌟 Join Our Community
									</p>
									<p className="text-gray-600">
										Connect with thousands of health enthusiasts and nutrition
										experts worldwide.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignupPage;
