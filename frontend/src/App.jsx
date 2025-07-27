import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DietFormPage from './pages/DietFormPage';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './pages/UserDashboard'; // Import UserDashboard
import AdminDashboard from './pages/AdminDashboard'; // Import AdminDashboard

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />            
            {/* Protected User Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/get-plan" element={<DietFormPage />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
