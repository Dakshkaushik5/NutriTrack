import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminDashboard, updatePlanStatus } from '../services/api';
import { UsersIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await getAdminDashboard();
      setRequests(data);
    } catch (err) {
      setError('Could not fetch data. You may not have admin privileges.');
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
      console.error('Failed to update status', err);
      alert('Could not update the status. Please try again.');
    }
  };

  const pendingRequests = requests.filter(req => req.status === 'Pending').length;
  const totalClients = new Set(requests.map(req => req.user.email)).size;

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
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">Manage client requests and track your progress.</p>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <div className="bg-yellow-500 p-3 rounded-full">
              <ClockIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">{pendingRequests}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <div className="bg-green-500 p-3 rounded-full">
              <CheckCircleIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed Plans</p>
              <p className="text-2xl font-bold text-gray-900">{requests.length - pendingRequests}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
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
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Client Plan Requests</h2>
          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req._id} className="bg-gray-50 p-4 rounded-md border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <p className="text-lg font-semibold text-gray-900">{req.user.name}</p>
                    <p className="text-sm text-gray-600">{req.user.email}</p>
                    <p className="text-sm text-gray-500 mt-1">Goal: {req.healthGoals.primaryGoal}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                     <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {req.status}
                      </span>
                    <Link to={`/admin/request/${req._id}`} className="text-sm font-medium text-green-600 hover:text-green-800">
                      View Details
                    </Link>
                    {req.status === 'Pending' && (
                      <button
                        onClick={() => handleStatusUpdate(req._id, 'Completed')}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">No new plan requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;