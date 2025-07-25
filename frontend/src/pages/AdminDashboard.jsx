import React, {useState, useEffect} from 'react';
import { getAdminDashboard, updatePlanStatus } from '../services/api'; // Import the new function

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAdminDashboard();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch data. You may not have admin privileges.');
        setLoading(false);
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // --- NEW FUNCTION to handle the status update ---
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const { data: updatedRequest } = await updatePlanStatus(id, newStatus);
      
      // Update the state locally to reflect the change immediately in the UI
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

  if (loading) {
    return <div className="text-center py-20">Loading Admin Dashboard...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">New Diet Plan Requests</h2>
        {requests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  {/* --- NEW COLUMN for actions --- */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.healthGoals.primaryGoal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(req.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    {/* --- NEW CELL with the button --- */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {req.status === 'Pending' && (
                        <button
                          onClick={() => handleStatusUpdate(req._id, 'Completed')}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Mark as Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">No new plan requests found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
