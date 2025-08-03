<<<<<<< HEAD
  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { getUserDashboard } from '../services/api';
  import { ClockIcon, CheckCircleIcon, PlusIcon, PencilIcon } from '@heroicons/react/24/outline';

  const UserDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await getUserDashboard();
          setDashboardData(data);
        } catch (err) {
          setError('Could not fetch dashboard data.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

    if (loading) return <div className="text-center py-20">Loading your dashboard...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">Welcome, {dashboardData?.userProfile?.name}!</h1>
              <p className="mt-2 text-lg text-gray-600">Here's an overview of your journey with NutriTrack.</p>
            </div>
            <Link to="/get-plan" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-md">
              <PlusIcon className="h-5 w-5 mr-2" />
              Request New Plan
            </Link>
          </div>
          <div className="md:col-span-1">
=======
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
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
import {getUserDashboard} from "../services/api";

const UserDashboard = () => {
	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const {data} = await getUserDashboard();
				setDashboardData(data);
				setLoading(false);
			} catch (err) {
				setError("Could not fetch dashboard data.");
				setLoading(false);
				console.error(err);
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return <div className="text-center py-10">Loading your dashboard...</div>;
	}

	if (error) {
		return <div className="text-center py-10 text-red-500">{error}</div>;
	}

	return (
		<div className="bg-gray-100 min-h-screen">
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<header className="flex justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Welcome, {dashboardData?.userProfile?.name}!
						</h1>
						<p className="text-lg text-gray-600">
							Here's an overview of your journey with NutriTrack.
						</p>
					</div>
					<Link
						to="/"
						className="flex items-center text-black-400 hover:text-green-400 transition-colors duration-300 group"
					>
						<ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
						<span>Log Out</span>
					</Link>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="md:col-span-2">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h2 className="text-2xl font-semibold text-gray-800 mb-4">
								My Diet Plan Requests
							</h2>
							{dashboardData?.planRequests?.length > 0 ? (
								<ul className="space-y-4">
									{dashboardData.planRequests.map((req) => (
										<li
											key={req._id}
											className="border p-4 rounded-md flex justify-between items-center"
										>
											<div>
												<p className="font-semibold">
													{req.healthGoals.primaryGoal} Plan
												</p>
												<p className="text-sm text-gray-500">
													Requested on:{" "}
													{new Date(req.date).toLocaleDateString()}
												</p>
											</div>
											<span
												className={`px-3 py-1 text-sm font-medium rounded-full ${
													req.status === "Pending"
														? "bg-yellow-100 text-yellow-800"
														: "bg-green-100 text-green-800"
												}`}
											>
												{req.status}
											</span>
										</li>
									))}
								</ul>
							) : (
								<div className="text-center py-10 border-2 border-dashed rounded-lg">
									<p className="text-gray-500">
										You haven't requested any diet plans yet.
									</p>
									<Link
										to="/get-plan"
										className="mt-4 inline-block text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium"
									>
										Get Your First Plan
									</Link>
								</div>
							)}
						</div>
					</div>

					{/* Profile Sidebar */}
					<div className="md:col-span-1">
>>>>>>> aa9e7cd61d65f3c27ee11725d8d008a8fdbd1e8d
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-gray-800 mb-4">
								My Profile
							</h3>
							<div className="space-y-2">
								<p>
									<span className="font-semibold">Name:</span>{" "}
									{dashboardData?.userProfile?.name}
								</p>
								<p>
									<span className="font-semibold">Email:</span>{" "}
									{dashboardData?.userProfile?.email}
								</p>
								<p>
									<span className="font-semibold">Member Since:</span>{" "}
									{new Date(
										dashboardData?.userProfile?.date
									).toLocaleDateString()}
								</p>
<<<<<<< HEAD
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Diet Plan Requests</h2>
            {dashboardData?.planRequests?.length > 0 ? (
              <ul className="space-y-4">
                {dashboardData.planRequests.map((req) => (
                  <li key={req._id} className="border p-4 rounded-md flex justify-between items-center bg-gray-50">
                    <div>
                      <p className="font-semibold text-gray-800">{req.healthGoals.primaryGoal} Plan</p>
                      <p className="text-sm text-gray-500">Requested on: {new Date(req.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {req.status === 'Pending' ? <ClockIcon className="h-4 w-4 mr-1.5" /> : <CheckCircleIcon className="h-4 w-4 mr-1.5" />}
                        {req.status}
                      </span>
                      
                      {/* --- NEW: Edit Button --- */}
                      {req.status === 'Pending' && (
                        <Link to={`/edit-plan/${req._id}`} className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-200 transition-colors">
                          <PencilIcon className="h-5 w-5" />
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12"><p className="text-gray-500">You haven't requested any diet plans yet.</p></div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
=======
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
>>>>>>> aa9e7cd61d65f3c27ee11725d8d008a8fdbd1e8d

  export default UserDashboard;
