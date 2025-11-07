import { CheckCircle, X } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    id: 1,
    name: "Basic",
    price: 1500,
    description: "Perfect for getting started",
  },
  { id: 2, name: "Silver", price: 5000, description: "Popular for most users" },
  {
    id: 3,
    name: "Gold",
    price: 10000,
    description: "Advanced features for growing businesses",
  },
  {
    id: 4,
    name: "Premium",
    price: 25000,
    description: "All features included — ultimate experience",
  },
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
      {/* Background */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="absolute inset-0 animate-gradient-x opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 py-20 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0E562B] mb-3 tracking-tight">
              Subscription Plans
            </h1>
            <p className="text-gray-600 mb-14 text-base sm:text-lg">
              Choose the plan that best fits your business needs.
            </p>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 p-8 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-[#0E562B] mb-3">
                      {plan.name}
                    </h2>
                    <p className="text-4xl font-bold text-[#16a34a] mb-2">
                      ₹{plan.price}
                    </p>
                    <p className="text-gray-500 mb-6">{plan.description}</p>

                    <div className="space-y-3">
                      {[
                        "Priority Support",
                        "Unlimited Access",
                        "Easy Upgrade",
                      ].map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <CheckCircle size={18} className="text-[#16a34a]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(plan)}
                    className="mt-6 bg-green-700 hover:bg-[#138c2d] text-white font-medium py-2 px-5 rounded-lg transition-all duration-200 shadow-sm text-sm cursor-pointer"
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
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold text-[#0E562B] mb-1">
              {selectedPlan.name} Plan
            </h2>
            <p className="text-3xl font-bold text-[#16a34a] mb-3">
              ₹{selectedPlan.price}
            </p>
            <p className="text-gray-600 mb-5">{selectedPlan.description}</p>

            {/* QR Section */}
            <div className="bg-gray-100 rounded-xl p-4 mb-5 text-center">
              <p className="text-gray-600 text-sm mb-2 font-medium">
                QR Code for Payment
              </p>
              <div className="w-36 h-36 mx-auto bg-gray-300 rounded flex items-center justify-center">
                <span className="text-gray-500 text-sm">QR Code</span>
              </div>
            </div>

            {/* Upload Section */}
            <div className="mb-6">
              <label className="font-semibold text-gray-800 text-sm block mb-1">
                Upload Payment Screenshot (Required)
              </label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handlePaymentUpload}
                className="border border-gray-300 rounded-lg p-2 text-sm w-full"
              />
              {paymentFile && (
                <p className="text-green-700 font-medium text-sm mt-2">
                  {paymentFile.name}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <div className="flex justify-center">
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmitPayment}
                    className="mt-6 bg-green-700 hover:bg-[#138c2d] text-white font-medium py-3 px-25 rounded-lg transition-all duration-200 shadow-md text-base cursor-pointer"
                  >
                    Submit Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Animation */}
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
