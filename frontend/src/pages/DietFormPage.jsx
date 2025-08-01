import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitPlanRequest, createOrder, verifyPayment } from '../services/api';

const DietFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    height: '',
    weight: '',
    primaryGoal: 'Weight Loss',
    targetWeight: '',
    foodType: 'Vegetarian',
    allergies: '',
    dislikedFoods: '',
    conditions: '',
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const displayRazorpay = async (planRequestId) => {
    try {
      // 1. Create a Razorpay Order from your backend
      const { data: order } = await createOrder({ amount: 499, planRequestId }); // Example amount: 499 INR

      const options = {
        key: 'rzp_test_zzqQvWlpHUOckS',
        amount: order.amount,
        currency: order.currency,
        name: 'NutriTrack Diet Plan',
        description: 'Personalized Diet Plan Service',
        order_id: order.id,
        handler: async function (response) {
          // 2. This function is called after a successful payment
          try {
            const verificationData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };
            // 3. Verify the payment on your backend
            const { data } = await verifyPayment(verificationData);
            if(data.success) {
                alert('Payment Successful! Your diet plan will be sent to you shortly.');
                navigate('/dashboard'); // Redirect to user dashboard
            } else {
                alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error', error);
            alert(`Payment verification failed: ${error.response?.data?.message || error.message}`);
          }
        },
        prefill: {
          // You can prefill user's name, email, etc. from your app's state
          name: 'Daksh Kaushik', // Example
          email: 'daksh@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#16a34a', // A nice green color
        },
        // --- NEW: Payment Failure Handler ---
        modal: {
            ondismiss: function() {
                console.log('Razorpay modal was closed.');
            }
        },
        "payment.failed": function (response) {
            alert(`Payment Failed. Error: ${response.error.description}`);
            console.error('Payment Failed:', response.error);
        }
      };
      // 4. Open the Razorpay payment window
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Razorpay order creation failed', error);
      alert(`Could not initiate payment: ${error.response?.data?.message || error.message}. Please check your API keys and ngrok setup.`);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Structure the data as expected by the backend model
      const structuredData = {
        personalInfo: {
          age: formData.age,
          gender: formData.gender,
          height: formData.height,
          weight: formData.weight,
        },
        healthGoals: {
          primaryGoal: formData.primaryGoal,
          targetWeight: formData.targetWeight,
        },
        dietaryPreferences: {
          foodType: formData.foodType,
          allergies: formData.allergies.split(',').map(item => item.trim()),
          dislikedFoods: formData.dislikedFoods.split(',').map(item => item.trim()),
        },
        medicalHistory: {
          conditions: formData.conditions.split(',').map(item => item.trim()),
        },
      };

      // Submit the form data to our backend
      const { data: planRequest } = await submitPlanRequest(structuredData);
      
      // If form submission is successful, proceed to payment
      if (planRequest._id) {
        displayRazorpay(planRequest._id);
      }

    } catch (err) {
      console.error(err.response);
      alert('Failed to submit form. Please check your details and try again.');
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Create Your Personalized Diet Plan</h2>
          <form onSubmit={onSubmit} className="space-y-8">
            {/* Personal Information */}
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

            {/* Health Goals */}
            <fieldset className="space-y-4 border p-6 rounded-md">
              <legend className="text-xl font-semibold text-gray-800 px-2">Health Goals</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select name="primaryGoal" value={formData.primaryGoal} onChange={onChange} className="w-full px-4 py-2 border rounded-md">
                  <option>Weight Loss</option>
                  <option>Weight Gain</option>
                  <option>Muscle Gain</option>
                  <option>Stay Fit</option>
                </select>
                <input type="number" name="targetWeight" placeholder="Target Weight (kg, optional)" value={formData.targetWeight} onChange={onChange} className="w-full px-4 py-2 border rounded-md" />
              </div>
            </fieldset>

            {/* Dietary Preferences */}
            <fieldset className="space-y-4 border p-6 rounded-md">
              <legend className="text-xl font-semibold text-gray-800 px-2">Dietary Preferences</legend>
              <select name="foodType" value={formData.foodType} onChange={onChange} className="w-full px-4 py-2 border rounded-md">
                <option>Vegetarian</option>
                <option>Non-Vegetarian</option>
                <option>Eggetarian</option>
                <option>Vegan</option>
              </select>
              <input type="text" name="allergies" placeholder="Any Allergies? (comma-separated)" value={formData.allergies} onChange={onChange} className="w-full px-4 py-2 border rounded-md" />
              <input type="text" name="dislikedFoods" placeholder="Foods you dislike (comma-separated)" value={formData.dislikedFoods} onChange={onChange} className="w-full px-4 py-2 border rounded-md" />
            </fieldset>

            {/* Medical History */}
            <fieldset className="space-y-4 border p-6 rounded-md">
              <legend className="text-xl font-semibold text-gray-800 px-2">Medical History</legend>
              <input type="text" name="conditions" placeholder="Any medical conditions? (comma-separated)" value={formData.conditions} onChange={onChange} className="w-full px-4 py-2 border rounded-md" />
            </fieldset>

            <div className="text-center pt-4">
              <button type="submit" className="px-8 py-3 text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors shadow-lg">
                Submit & Proceed to Payment (₹499)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DietFormPage;