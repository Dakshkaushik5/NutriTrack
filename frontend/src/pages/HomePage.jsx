import React, {useState, useEffect} from "react";
import {
	Menu,
	X,
	Leaf,
	Heart,
	Apple,
	Users,
	Award,
	CheckCircle,
} from "lucide-react";
import { ScaleIcon, HeartIcon, FireIcon, SparklesIcon, ChartPieIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import {Link} from "react-router-dom";

const HomePage = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
			{/* Navigation */}
			<nav
				className={`fixed w-full z-50 transition-all duration-300 ${
					scrollY > 50
						? "bg-white/95 backdrop-blur-md shadow-lg"
						: "bg-transparent"
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16 md:h-20">
						{/* Logo */}
						<div className="flex items-center space-x-2">
							<div className="bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-full">
								<Leaf className="h-6 w-6 text-white" />
							</div>
							<span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
								NutriTrack
							</span>
						</div>

						{/* Desktop Menu */}
						<div className="hidden md:flex items-center space-x-8">
							<a
								href="#home"
								className="text-gray-700 hover:text-green-600 transition-colors font-medium"
							>
								Home
							</a>
							<a
								href="#services"
								className="text-gray-700 hover:text-green-600 transition-colors font-medium"
							>
								Services
							</a>
							<a
								href="#contact"
								className="text-gray-700 hover:text-green-600 transition-colors font-medium"
							>
								Contact
							</a>
						</div>

						{/* Auth Buttons */}
						<div className="hidden md:flex items-center space-x-4">
							<Link
								to="login"
								className="text-green-600 hover:text-green-700 font-medium transition-colors"
							>
								Login
							</Link>
							<Link
								to="/signup"
								className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl"
							>
								Sign Up
							</Link>
						</div>

						{/* Mobile Menu Button - Only visible on mobile */}
						<button
							onClick={toggleMenu}
							className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
						>
							{isMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden bg-white border-t shadow-lg">
						<div className="px-4 py-2 space-y-2">
							<a
								href="#home"
								className="block py-3 text-gray-700 hover:text-green-600 transition-colors"
							>
								Home
							</a>
							<a
								href="#services"
								className="block py-3 text-gray-700 hover:text-green-600 transition-colors"
							>
								Services
							</a>
							<a
								href="#contact"
								className="block py-3 text-gray-700 hover:text-green-600 transition-colors"
							>
								Contact
							</a>
							<div className="flex space-x-2 pt-4 pb-2">
								<Link
									to="/login"
									className="flex-1 text-green-600 border border-green-600 py-2 rounded-full"
								>
									Login
								</Link>
								<Link
									to="/signup"
									className="flex-1 bg-green-500 text-white py-2 rounded-full"
								>
									Sign Up
								</Link>
							</div>
						</div>
					</div>
				)}
			</nav>

			{/* Hero Section */}
			<section id="home" className="pt-20 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8">
							<div className="space-y-6">
								<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
									<span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
										Nourish Your Body,
									</span>
									<br />
									<span className="text-gray-800">Transform Your Life</span>
								</h1>
								<p className="text-lg md:text-xl text-gray-600 leading-relaxed">
									"Let food be thy medicine and medicine be thy food." -
									Hippocrates
								</p>
								<p className="text-gray-600 max-w-lg">
									Discover the power of personalized nutrition. Our expert
									guidance helps you achieve optimal health through sustainable
									lifestyle changes and mindful eating habits.
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<Link
									to="/signup"
									className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
									Start Your Journey
								</Link>
								<a
									href="#services"
									className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-300">
									Learn More
								</a>
							</div>

							<div className="flex items-center space-x-8 pt-4">
								<div className="text-center">
									<div className="text-2xl font-bold text-green-600">500+</div>
									<div className="text-sm text-gray-500">Happy Clients</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold text-green-600">5+</div>
									<div className="text-sm text-gray-500">Years Experience</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold text-green-600">98%</div>
									<div className="text-sm text-gray-500">Success Rate</div>
								</div>
							</div>
						</div>

						<div className="relative z-10 bg-white p-4 rounded-3xl shadow-2xl">
							<div className="relative z-10">
								<img
									src="./bowl.png"
									alt="Healthy Food Bowl"
									className="w-full h-auto rounded-3xl shadow-2xl"
								/>
							</div>
							<div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80 animate-pulse"></div>
							<div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-60 animate-pulse"></div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="services" className="py-20 bg-white/50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
							Why Choose Pure Wellness?
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							"Take care of your body. It's the only place you have to live." -
							Jim Rohn
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								icon: <Heart className="h-8 w-8" />,
								title: "Personalized Plans",
								description:
									"Tailored nutrition plans designed specifically for your unique needs, goals, and lifestyle preferences.",
							},
							{
								icon: <Apple className="h-8 w-8" />,
								title: "Natural Approach",
								description:
									"Focus on whole foods and natural ingredients to nourish your body from the inside out.",
							},
							{
								icon: <Users className="h-8 w-8" />,
								title: "Expert Guidance",
								description:
									"Certified nutritionists with years of experience helping people achieve their health goals.",
							},
							{
								icon: <Award className="h-8 w-8" />,
								title: "Proven Results",
								description:
									"Track record of successful transformations and improved health outcomes for our clients.",
							},
							{
								icon: <CheckCircle className="h-8 w-8" />,
								title: "Ongoing Support",
								description:
									"Continuous monitoring and adjustments to ensure you stay on track with your wellness journey.",
							},
							{
								icon: <Leaf className="h-8 w-8" />,
								title: "Sustainable Habits",
								description:
									"Build lasting lifestyle changes that promote long-term health and well-being.",
							},
						].map((feature, index) => (
							<div
								key={index}
								className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100"
							>
								<div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white p-3 rounded-full w-fit mb-6">
									{feature.icon}
								</div>
								<h3 className="text-xl font-semibold text-gray-800 mb-4">
									{feature.title}
								</h3>
								<p className="text-gray-600 leading-relaxed">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* --- Feature/Benefit Section (Refined Layout) --- */}
			<section className="bg-white py-16 sm:py-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
						<div className="lg:col-span-6">
							<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
								More Than Just a Diet Plan
							</h2>
							<p className="mt-3 text-lg text-gray-500">
								We believe in a holistic approach to health. Our plans are
								designed to fit your life, not the other way around.
							</p>
							<div className="mt-8 space-y-8">
								<div className="flex">
									<ShieldCheckIcon
										className="flex-shrink-0 h-6 w-6 text-green-500"
										aria-hidden="true"
									/>
									<div className="ml-4">
										<h3 className="text-lg leading-6 font-medium text-gray-900">
											Science-Backed Methods
										</h3>
										<p className="mt-2 text-base text-gray-500">
											All plans are based on the latest nutritional science to
											ensure they are safe, effective, and healthy.
										</p>
									</div>
								</div>
								<div className="flex">
									<SparklesIcon
										className="flex-shrink-0 h-6 w-6 text-green-500"
										aria-hidden="true"
									/>
									<div className="ml-4">
										<h3 className="text-lg leading-6 font-medium text-gray-900">
											Truly Personalized
										</h3>
										<p className="mt-2 text-base text-gray-500">
											We consider your lifestyle, dietary preferences, and
											health data to create a plan that is 100% unique to you.
										</p>
									</div>
								</div>
								<div className="flex">
									<ChartPieIcon
										className="flex-shrink-0 h-6 w-6 text-green-500"
										aria-hidden="true"
									/>
									<div className="ml-4">
										<h3 className="text-lg leading-6 font-medium text-gray-900">
											Ongoing Support & Tracking
										</h3>
										<p className="mt-2 text-base text-gray-500">
											You're not alone. We provide continuous support and
											progress tracking to keep you motivated.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-10 lg:mt-0 lg:col-span-6">
							{/* Constrained image height */}
							<div className="rounded-2xl shadow-xl overflow-hidden max-h-[500px]">
								<img
									className="w-full h-full object-cover"
									src="[https://images.unsplash.com/photo-1522199670076-2852f80289c3?q=80&w=1200&auto=format&fit=crop](https://images.unsplash.com/photo-1522199670076-2852f80289c3?q=80&w=1200&auto=format&fit=crop)"
									alt="Person working on a laptop"
									onError={(e) => {
										e.target.onerror = null;
										e.target.src =
											"[https://placehold.co/600x800/A3E635/FFFFFF?text=Success+Story](https://placehold.co/600x800/A3E635/FFFFFF?text=Success+Story)";
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* --- How It Works Section --- */}
			<section id="how-it-works" className="py-20 bg-gray-50 overflow-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-base font-semibold text-green-600 tracking-wider uppercase">
							Your Simple Path
						</h2>
						<p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
							Get Started in 3 Easy Steps
						</p>
					</div>
					<div className="relative">
						<div
							className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"
							aria-hidden="true"
						></div>
						<div className="relative grid md:grid-cols-3 gap-12">
							<div className="flex flex-col items-center text-center">
								<div className="flex items-center justify-center h-16 w-16 rounded-full bg-white border-2 border-green-500 text-green-500 font-bold text-2xl z-10">
									1
								</div>
								<h3 className="mt-5 text-xl font-semibold text-gray-900">
									Fill The Form
								</h3>
								<p className="mt-2 text-gray-600">
									Provide your health details, goals, and lifestyle habits in
									our secure form.
								</p>
							</div>
							<div className="flex flex-col items-center text-center">
								<div className="flex items-center justify-center h-16 w-16 rounded-full bg-white border-2 border-green-500 text-green-500 font-bold text-2xl z-10">
									2
								</div>
								<h3 className="mt-5 text-xl font-semibold text-gray-900">
									Get Your Plan
								</h3>
								<p className="mt-2 text-gray-600">
									Receive a 100% personalized diet plan crafted by your
									certified dietitian.
								</p>
							</div>
							<div className="flex flex-col items-center text-center">
								<div className="flex items-center justify-center h-16 w-16 rounded-full bg-white border-2 border-green-500 text-green-500 font-bold text-2xl z-10">
									3
								</div>
								<h3 className="mt-5 text-xl font-semibold text-gray-900">
									See The Results
								</h3>
								<p className="mt-2 text-gray-600">
									Follow your plan with our ongoing support and start your
									health transformation.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonial Section */}
			<section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
						What Our Clients Say
					</h2>
					<div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl">
						<div className="text-4xl text-green-500 mb-6">"</div>
						<p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
							"Working with Pure Wellness transformed not just my eating habits,
							but my entire relationship with food. I've never felt more
							energetic and confident in my body."
						</p>
						<div className="flex items-center justify-center space-x-4">
							<div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
								S
							</div>
							<div className="text-left">
								<div className="font-semibold text-gray-800">Sarah Johnson</div>
								<div className="text-gray-500">Marketing Executive</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 bg-gray-50">
				<div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-extrabold text-gray-900">
							Have a Question?
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							We're here to help. Send us a message and we'll get back to you as
							soon as possible.
						</p>
					</div>
					<form className="mt-8 space-y-6">
						<div>
							<input
								type="text"
								placeholder="Your Name"
								className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 shadow-sm"
							/>
						</div>
						<div>
							<input
								type="email"
								placeholder="Your Email"
								className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 shadow-sm"
							/>
						</div>
						<div>
							<textarea
								placeholder="Your Message"
								rows="4"
								className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 shadow-sm"
							></textarea>
						</div>
						<div className="text-center">
							<button
								type="submit"
								className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm"
							>
								Send Message
							</button>
						</div>
					</form>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-r from-green-500 to-emerald-500">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
						Ready to Transform Your Health?
					</h2>
					<p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
						"The groundwork for all happiness is good health." - Leigh Hunt
					</p>
					<p className="text-lg text-green-100 mb-10 max-w-2xl mx-auto">
						Join hundreds of satisfied clients who have discovered the power of
						personalized nutrition. Start your wellness journey today.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
							Book Free Consultation
						</button>
						<button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300">
							View Our Plans
						</button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer id="contact" className="bg-gray-800 text-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-4 gap-8">
						<div className="md:col-span-2">
							<div className="flex items-center space-x-2 mb-4">
								<div className="bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-full">
									<Leaf className="h-6 w-6 text-white" />
								</div>
								<span className="text-xl font-bold">Nutri Track</span>
							</div>
							<p className="text-gray-400 mb-6 max-w-md">
								Empowering individuals to achieve optimal health through
								personalized nutrition and sustainable lifestyle changes.
							</p>
							<p className="text-sm text-gray-500 italic">
								"Health is not about the weight you lose, but about the life you
								gain."
							</p>
						</div>

						<div>
							<h3 className="font-semibold mb-4">Quick Links</h3>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a
										href="#home"
										className="hover:text-white transition-colors"
									>
										Home
									</a>
								</li>
								<li>
									<a
										href="#services"
										className="hover:text-white transition-colors"
									>
										Services
									</a>
								</li>
								<li>
									<a
										href="#contact"
										className="hover:text-white transition-colors"
									>
										Contact
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-semibold mb-4">Contact Info</h3>
							<ul className="space-y-2 text-gray-400">
								<li>📧 dakshkaushik052@gmail.com</li>
								<li>📞 +(91) 9599659780</li>
								<li>📍 Dadri, Uttar Pradesh</li>
							</ul>
						</div>
					</div>

					<div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
						<p>
							&copy; 2025 Nutri Track. All rights reserved. Made with 💚 for
							your health.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default HomePage;
