import { CheckCircle } from "lucide-react";
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

  const handleViewDetails = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#0E562B] mb-3">Subscription Plans</h1>
          <p className="text-gray-600 mb-12 text-lg">
            Choose the plan that best fits your business needs.
          </p>

          {/* Plans Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border border-gray-100 p-8 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-[#0E562B] mb-2">{plan.name}</h2>
                  <p className="text-4xl font-bold text-[#81B633] mb-4">₹{plan.price}</p>
                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                  <ul className="text-sm text-gray-700 space-y-2 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-[#81B633]" />
                      Priority Support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-[#81B633]" />
                      Unlimited Access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-[#81B633]" />
                      Easy Upgrade
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleViewDetails(plan)}
                  className="w-full bg-[#81B633] hover:bg-[#6ea32b] text-white font-semibold py-2.5 rounded-lg transition shadow-md"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
            <h2 className="text-2xl font-bold text-[#0E562B] mb-2">{selectedPlan.name} Plan</h2>
            <p className="text-3xl font-bold text-[#81B633] mb-4">₹{selectedPlan.price}</p>
            <p className="text-gray-600 mb-6">{selectedPlan.description}</p>

            <div className="bg-gray-100 rounded-lg p-4 mb-6 text-center">
              <p className="text-sm text-gray-600 mb-2">QR Code for Payment</p>
              <div className="w-36 h-36 bg-gray-300 rounded flex items-center justify-center mx-auto">
                <span className="text-gray-500 text-sm">QR Code</span>
              </div>
            </div>

            <p className="text-center text-gray-600 mb-6">
              Or call: <span className="font-bold text-[#0E562B]">1800-BM2-MALL</span>
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => alert(`${selectedPlan.name} plan marked as paid (demo only)`)}
                className="w-full bg-[#81B633] hover:bg-[#6ea32b] text-white font-semibold py-2.5 rounded-lg transition shadow-md"
              >
                Mark as Paid
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full border border-gray-300 text-gray-800 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
