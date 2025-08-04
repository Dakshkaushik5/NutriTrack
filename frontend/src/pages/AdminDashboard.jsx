import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { getAdminDashboard, updatePlanStatus } from "../services/api";
import {
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ExclamationTriangleIcon, // Added for payment status
} from "@heroicons/react/24/outline";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate(); // Hook for programmatic navigation

  // --- Logout Handler ---
  // This function clears the user's session and redirects them.
  const handleLogout = () => {
    // 1. Remove the authentication token from local storage.
    //    IMPORTANT: Replace 'userToken' with the actual key you use to store the token.
    localStorage.removeItem("userToken");

    // 2. Redirect to the login page or homepage.
    navigate("/login"); // Or navigate('/')
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await getAdminDashboard();
      // NOTE: We assume the API now returns a 'paymentStatus' field ('Paid' or 'Unpaid')
      setRequests(data);
    } catch (err) {
      setError("Could not fetch data. You may not have admin privileges.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const { data: updatedRequest } = await updatePlanStatus(id, newStatus);
      setRequests(
        requests.map((req) =>
          req._id === id ? { ...req, status: updatedRequest.status } : req
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Could not update the status. Please try again.");
    }
  };

  const pendingRequests = requests.filter(
    (req) => req.status === "Pending"
  ).length;
  const totalClients = new Set(requests.map((req) => req.user.email)).size;

  if (loading) {
    return <div className="text-center py-20">Loading Admin Dashboard...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <header className="mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage client requests and track your progress.
            </p>
          </header>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="h-12 w-12 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors duration-200"
          >
            <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-red-600" />
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
                <div className="bg-yellow-500 p-3 rounded-full">
                    <ClockIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{pendingRequests}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
                <div className="bg-green-500 p-3 rounded-full">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Completed Plans</p>
                    <p className="text-2xl font-bold text-gray-900">{requests.length - pendingRequests}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
                <div className="bg-blue-500 p-3 rounded-full">
                    <UsersIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Clients</p>
                    <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
                </div>
            </div>
        </div>

        {/* Request List */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Client Plan Requests
          </h2>
          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((req) => {
                const isPaid = req.paymentStatus === "Paid";
                return (
                  <div
                    key={req._id}
                    className={`bg-gray-50 p-4 rounded-lg border border-gray-200 transition-opacity ${!isPaid ? "opacity-60" : ""}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-4 sm:mb-0">
                        <p className="text-lg font-semibold text-gray-900">{req.user.name}</p>
                        <p className="text-sm text-gray-600">{req.user.email}</p>
                        <p className="text-sm text-gray-500 mt-1">Goal: {req.healthGoals.primaryGoal}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        {/* Payment Status Badge */}
                        {!isPaid && (
                           <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 inline-flex items-center gap-1">
                             <ExclamationTriangleIcon className="h-4 w-4" />
                             Payment Pending
                           </span>
                        )}
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            req.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                        }`}>
                          {req.status}
                        </span>

                        {/* View Details button - disabled if not paid */}
                        <button
                          onClick={() => isPaid && setExpandedId(expandedId === req._id ? null : req._id)}
                          className={`text-sm font-medium ${isPaid ? "text-blue-600 hover:text-blue-800" : "text-gray-400 cursor-not-allowed"}`}
                          disabled={!isPaid}
                        >
                          {expandedId === req._id ? "Hide Details" : "View Details"}
                        </button>

                        {/* Mark as Completed button - disabled if not paid */}
                        {req.status === "Pending" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusUpdate(req._id, "Completed");
                            }}
                            className={`text-sm font-medium ${isPaid ? "text-indigo-600 hover:text-indigo-900" : "text-gray-400 cursor-not-allowed"}`}
                            disabled={!isPaid}
                          >
                            Mark as Completed
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expanded section */}
                    {expandedId === req._id && isPaid && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        {/* Details remain the same... */}
                         <div><p className="text-gray-500 font-semibold">Name</p><p>{req.user?.name}</p></div>
                         <div><p className="text-gray-500 font-semibold">Email</p><p>{req.user?.email}</p></div>
                         <div><p className="text-gray-500 font-semibold">Age</p><p>{req.personalInfo?.age}</p></div>
                         <div><p className="text-gray-500 font-semibold">Gender</p><p>{req.personalInfo?.gender}</p></div>
                         <div><p className="text-gray-500 font-semibold">Height</p><p>{req.personalInfo?.height} cm</p></div>
                         <div><p className="text-gray-500 font-semibold">Weight</p><p>{req.personalInfo?.weight} kg</p></div>
                         <div><p className="text-gray-500 font-semibold">Primary Goal</p><p>{req.healthGoals?.primaryGoal}</p></div>
                         <div><p className="text-gray-500 font-semibold">Target Weight</p><p>{req.healthGoals?.targetWeight} kg</p></div>
                         <div><p className="text-gray-500 font-semibold">Food Type</p><p>{req.dietaryPreferences?.foodType}</p></div>
                         <div><p className="text-gray-500 font-semibold">Allergies</p><p>{req.dietaryPreferences?.allergies?.join(", ") || "None"}</p></div>
                         <div><p className="text-gray-500 font-semibold">Disliked Foods</p><p>{req.dietaryPreferences?.dislikedFoods?.join(", ") || "None"}</p></div>
                         <div><p className="text-gray-500 font-semibold">Medical Conditions</p><p>{req.medicalHistory?.conditions?.join(", ") || "None"}</p></div>
                         <div><p className="text-gray-500 font-semibold">Status</p><p>{req.status}</p></div>
                         <div><p className="text-gray-500 font-semibold">Submitted On</p><p>{new Date(req.date).toLocaleString()}</p></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              No new plan requests found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
