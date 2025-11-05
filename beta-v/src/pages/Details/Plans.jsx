import { CheckCircle, X } from "lucide-react";
import { useState } from "react";

const plans = [
  { id: 1, name: "Basic", price: 499, description: "Perfect for getting started" },
  { id: 2, name: "Silver", price: 999, description: "Popular for most users" },
  { id: 3, name: "Gold", price: 1999, description: "Advanced features for growing businesses" },
  { id: 4, name: "Premium", price: 4999, description: "All features included — ultimate experience" },
];

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentFile, setPaymentFile] = useState(null);

  const handleViewDetails = (plan) => {
    setSelectedPlan(plan);
    setPaymentFile(null);
    setShowModal(true);
  };

  const handlePaymentUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPaymentFile(file);
  };

  const handleSubmitPayment = () => {
    if (!paymentFile) {
      alert("❌ Please upload payment screenshot before submitting!");
      return;
    }

    alert(`✅ ${selectedPlan.name} plan submitted. File: ${paymentFile.name}`);
    setShowModal(false);
    setPaymentFile(null);
  };

  return (
    <>
      {/* Animated Background */}
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-white to-green-50 animate-gradient-x z-0"></div>

        {/* Page Content */}
        <div className="relative z-10 py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0E562B] mb-4">Subscription Plans</h1>
            <p className="text-gray-600 mb-12 text-base sm:text-lg">
              Choose the plan that best fits your business needs.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-gray-100 p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#0E562B] mb-2">{plan.name}</h2>
                    <p className="text-3xl sm:text-4xl font-bold text-[#16a34a] mb-2">₹{plan.price}</p>
                    <p className="text-gray-600 text-sm sm:text-base mb-4">{plan.description}</p>

                    <ul className="text-gray-700 text-sm sm:text-base space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-[#16a34a]" /> Priority Support
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-[#16a34a]" /> Unlimited Access
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-[#16a34a]" /> Easy Upgrade
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleViewDetails(plan)}
                    className="w-full bg-green-700 hover:bg-[#138c2d] text-white font-semibold py-2.5 rounded-xl transition shadow-md text-base sm:text-lg"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative text-sm sm:text-base">
            {/* Close Cross */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-[#0E562B] mb-2">{selectedPlan.name} Plan</h2>
            <p className="text-2xl sm:text-3xl font-bold text-[#16a34a] mb-2">₹{selectedPlan.price}</p>
            <p className="text-gray-600 mb-4">{selectedPlan.description}</p>

            <div className="bg-gray-100 rounded-xl p-3 sm:p-4 mb-4 text-center">
              <p className="text-gray-600 text-xs sm:text-sm mb-2">QR Code for Payment</p>
              <div className="w-32 h-32 sm:w-36 sm:h-36 bg-gray-300 rounded flex items-center justify-center mx-auto">
                <span className="text-gray-500 text-xs sm:text-sm">QR Code</span>
              </div>
            </div>

            {/* Payment Upload */}
            <div className="mb-4 flex flex-col gap-2">
              <label className="font-semibold text-gray-800 text-sm">Upload Payment Screenshot (Required)</label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handlePaymentUpload}
                className="border border-gray-300 rounded-lg p-2 text-sm"
              />
              {paymentFile && (
                <span className="text-green-700 font-medium text-sm">{paymentFile.name}</span>
              )}
            </div>

            <button
              onClick={handleSubmitPayment}
              className="w-full bg-green-700 hover:bg-[#138c2d] text-white font-semibold py-2.5 rounded-xl transition shadow-md text-base sm:text-lg"
            >
              Submit Payment
            </button>
          </div>
        </div>
      )}

      {/* Animated Gradient CSS */}
      <style>
        {`
          @keyframes gradientX {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradientX 15s ease infinite;
          }
        `}
      </style>
    </>
  );
}
