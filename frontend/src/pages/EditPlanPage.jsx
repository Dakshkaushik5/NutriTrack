import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPlanById, updatePlanRequest } from '../services/api';

const EditPlanPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the plan ID from the URL

  const [formData, setFormData] = useState({
    age: '', gender: 'Male', height: '', weight: '',
    primaryGoal: 'Weight Loss', targetWeight: '',
    foodType: 'Vegetarian', allergies: '', dislikedFoods: '',
    conditions: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const { data } = await getPlanById(id);
        // De-structure the data from the backend and populate the form state
        setFormData({
          age: data.personalInfo.age,
          gender: data.personalInfo.gender,
          height: data.personalInfo.height,
          weight: data.personalInfo.weight,
          primaryGoal: data.healthGoals.primaryGoal,
          targetWeight: data.healthGoals.targetWeight || '',
          foodType: data.dietaryPreferences.foodType,
          allergies: data.dietaryPreferences.allergies.join(', '),
          dislikedFoods: data.dietaryPreferences.dislikedFoods.join(', '),
          conditions: data.medicalHistory.conditions.join(', '),
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch plan data", err);
        alert("Could not load your plan data. You may not be authorized to edit this.");
        navigate('/dashboard');
      }
    };
    fetchPlanData();
  }, [id, navigate]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const structuredData = {
        personalInfo: { age: formData.age, gender: formData.gender, height: formData.height, weight: formData.weight },
        healthGoals: { primaryGoal: formData.primaryGoal, targetWeight: formData.targetWeight },
        dietaryPreferences: { foodType: formData.foodType, allergies: formData.allergies.split(',').map(item => item.trim()), dislikedFoods: formData.dislikedFoods.split(',').map(item => item.trim()) },
        medicalHistory: { conditions: formData.conditions.split(',').map(item => item.trim()) },
      };

      await updatePlanRequest(id, structuredData);
      alert('Your plan request has been updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response);
      alert('Failed to update form. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading your plan for editing...</div>;
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Edit Your Diet Plan Request</h2>
          <form onSubmit={onSubmit} className="space-y-8">
            {/* Form fields are the same as DietFormPage, so they are omitted for brevity */}
            {/* The important part is that they are pre-filled by the `value` attribute */}
            <fieldset className="space-y-4 border p-6 rounded-md">
              <legend className="text-xl font-semibold text-gray-800 px-2">Personal Information</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={onChange} required className="w-full px-4 py-2 border rounded-md" />
                <select name="gender" value={formData.gender} onChange={onChange} className="w-full px-4 py-2 border rounded-md">
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <input type="number" name="height" placeholder="Height (cm)" value={formData.height} onChange={onChange} required className="w-full px-4 py-2 border rounded-md" />
                <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={onChange} required className="w-full px-4 py-2 border rounded-md" />
              </div>
            </fieldset>
            {/* ... other fieldsets ... */}
            <div className="text-center pt-4">
              <button type="submit" className="px-8 py-3 text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors shadow-lg">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPlanPage;
