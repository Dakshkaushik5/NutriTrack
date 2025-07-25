import React from 'react';
import { ScaleIcon, HeartIcon, FireIcon, SparklesIcon, ChartPieIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const smoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* --- Hero Section --- */}
      <div className="relative bg-gray-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="[https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=2400&auto=format&fit=crop](https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=2400&auto=format&fit=crop)"
            alt="Healthy food background"
            onError={(e) => { e.target.onerror = null; e.target.src='[https://placehold.co/1920x1080/374151/FFFFFF?text=Healthy+Lifestyle](https://placehold.co/1920x1080/374151/FFFFFF?text=Healthy+Lifestyle)'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-green-900 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Transform Your Health, One Meal at a Time
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
            Stop guessing what to eat. Get science-backed, personalized nutrition plans from a certified expert dedicated to helping you achieve your wellness goals.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <button
                onClick={() => smoothScroll('services')}
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 sm:px-8 transition-transform transform hover:scale-105"
              >
                Explore Plans
              </button>
              <button
                onClick={() => smoothScroll('how-it-works')}
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-600 bg-white hover:bg-green-50 sm:px-8"
              >
                How It Works
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Services Section --- */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-green-600 tracking-wider uppercase">What We Offer</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Nutrition for Every Stage of Life
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Whether you want to lose weight, manage a health condition, or boost your energy, we have a plan for you.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <ScaleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Weight Management</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Achieve your ideal weight with balanced, sustainable meal plans that you'll actually enjoy.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <HeartIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Medical Nutrition Therapy</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Manage conditions like Diabetes, PCOD, & high cholesterol with targeted dietary strategies.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <FireIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Sports & Performance</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Fuel your workouts, build muscle, and enhance recovery with a plan designed for athletes.
                  </p>
                </div>
              </div>
            </div>
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
                        We believe in a holistic approach to health. Our plans are designed to fit your life, not the other way around.
                    </p>
                    <div className="mt-8 space-y-8">
                        <div className="flex">
                            <ShieldCheckIcon className="flex-shrink-0 h-6 w-6 text-green-500" aria-hidden="true" />
                            <div className="ml-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Science-Backed Methods</h3>
                                <p className="mt-2 text-base text-gray-500">All plans are based on the latest nutritional science to ensure they are safe, effective, and healthy.</p>
                            </div>
                        </div>
                        <div className="flex">
                            <SparklesIcon className="flex-shrink-0 h-6 w-6 text-green-500" aria-hidden="true" />
                            <div className="ml-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Truly Personalized</h3>
                                <p className="mt-2 text-base text-gray-500">We consider your lifestyle, dietary preferences, and health data to create a plan that is 100% unique to you.</p>
                            </div>
                        </div>
                        <div className="flex">
                            <ChartPieIcon className="flex-shrink-0 h-6 w-6 text-green-500" aria-hidden="true" />
                            <div className="ml-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Ongoing Support & Tracking</h3>
                                <p className="mt-2 text-base text-gray-500">You're not alone. We provide continuous support and progress tracking to keep you motivated.</p>
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
                            onError={(e) => { e.target.onerror = null; e.target.src='[https://placehold.co/600x800/A3E635/FFFFFF?text=Success+Story](https://placehold.co/600x800/A3E635/FFFFFF?text=Success+Story)'; }}
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
            <h2 className="text-base font-semibold text-green-600 tracking-wider uppercase">Your Simple Path</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Get Started in 3 Easy Steps
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" aria-hidden="true"></div>
            <div className="relative grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white border-2 border-green-500 text-green-500 font-bold text-2xl z-10">1</div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">Fill The Form</h3>
                <p className="mt-2 text-gray-600">Provide your health details, goals, and lifestyle habits in our secure form.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white border-2 border-green-500 text-green-500 font-bold text-2xl z-10">2</div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">Get Your Plan</h3>
                <p className="mt-2 text-gray-600">Receive a 100% personalized diet plan crafted by your certified dietitian.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white border-2 border-green-500 text-green-500 font-bold text-2xl z-10">3</div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">See The Results</h3>
                <p className="mt-2 text-gray-600">Follow your plan with our ongoing support and start your health transformation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Trusted by People Like You</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="bg-gray-50 rounded-xl shadow-md p-8">
              <img className="h-10 w-10 rounded-full object-cover mx-auto" src="[https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300&auto=format&fit=crop](https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300&auto=format&fit=crop)" alt="Priya S."/>
              <p className="text-center text-lg text-gray-700 italic mt-6">"I've lost 10 kgs and have more energy than ever. It's not just a diet, it's a lifestyle change."</p>
              <div className="text-center mt-4">
                <div className="text-base font-medium text-gray-900">Priya Sharma</div>
                <div className="text-sm text-green-600 font-semibold">Weight Loss Plan</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl shadow-md p-8">
              <img className="h-10 w-10 rounded-full object-cover mx-auto" src="[https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop](https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop)" alt="Anjali K."/>
              <p className="text-center text-lg text-gray-700 italic mt-6">"Managing my PCOD felt impossible until I got my plan. The diet was simple, delicious, and incredibly effective."</p>
              <div className="text-center mt-4">
                <div className="text-base font-medium text-gray-900">Anjali Kapoor</div>
                <div className="text-sm text-green-600 font-semibold">PCOD Management Plan</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl shadow-md p-8">
              <img className="h-10 w-10 rounded-full object-cover mx-auto" src="[https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop](https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop)" alt="Rohan M."/>
              <p className="text-center text-lg text-gray-700 italic mt-6">"As an athlete, the sports nutrition plan boosted my performance and recovery time. The guidance was professional and tailored."</p>
              <div className="text-center mt-4">
                <div className="text-base font-medium text-gray-900">Rohan Mehra</div>
                <div className="text-sm text-green-600 font-semibold">Sports Nutrition Plan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Contact Form Section --- */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Have a Question?</h2>
            <p className="mt-4 text-lg text-gray-600">We're here to help. Send us a message and we'll get back to you as soon as possible.</p>
          </div>
          <form className="mt-8 space-y-6">
            <div>
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 shadow-sm" />
            </div>
            <div>
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 shadow-sm" />
            </div>
            <div>
              <textarea placeholder="Your Message" rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 shadow-sm"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm">Send Message</button>
            </div>
          </form>
        </div>
      </section>
      
      {/* --- Footer --- */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base text-gray-400">&copy; 2025 NutriTrack. All Rights Reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="[https://facebook.com](https://facebook.com)" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </a>
            <a href="[https://instagram.com](https://instagram.com)" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 4.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0-2a7 7 0 110 14 7 7 0 010-14zm6.406-1.185a1.285 1.285 0 100 2.57 1.285 1.285 0 000-2.57z" clipRule="evenodd" /></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;