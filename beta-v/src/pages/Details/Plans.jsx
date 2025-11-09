import { CheckCircle, Loader2, X } from "lucide-react";
import { useState } from "react";
import ScannerIMg from "../../assets/scanner.jpg";
import { usePlanUpload } from "../../hooks/plans/usePlanUpload";

const plans = [
  {
    id: 1,
    name: "Gold",
    price: 1500,
    description: "Perfect for getting started",
    color: "from-yellow-300 via-yellow-400 to-yellow-500",
    features: [
      "Basic Support",
      "Access to Core Tools",
      "Monthly Performance Report",
      "Community Access",
    ],
  },
  {
    id: 2,
    name: "Silver",
    price: 5000,
    description: "Popular for most users",
    color: "from-gray-300 via-gray-400 to-gray-500",
    features: [
      "Priority Email Support",
      "Access to All Tools",
      "Weekly Performance Report",
      "Team Collaboration Features",
      "Ad-Free Experience",
    ],
  },
  {
    id: 3,
    name: "Premium",
    price: 10000,
    description: "Advanced features for growing businesses",
    color: "from-green-400 via-emerald-500 to-green-600",
    features: [
      "24/7 Premium Support",
      "Advanced Analytics Dashboard",
      "Custom Branding Options",
      "Dedicated Account Manager",
      "Access to Beta Features",
      "Monthly Strategy Review",
    ],
  },
  {
    id: 4,
    name: "Platinum",
    price: 25000,
    description: "All features included — ultimate experience",
    color: "from-purple-400 via-purple-500 to-purple-600",
    features: [
      "Dedicated Success Manager",
      "24/7 Phone & Chat Support",
      "Unlimited Team Accounts",
      "Custom API Integrations",
      "Exclusive Early Access to New Tools",
      "Personalized Training Sessions",
      "Priority Feature Requests",
    ],
  },
];

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentFile, setPaymentFile] = useState(null);
  const { uploadPlan, loading } = usePlanUpload();

  const handleViewDetails = (plan) => {
    setSelectedPlan(plan);
    setPaymentFile(null);
    setShowModal(true);
  };

  const handlePaymentUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPaymentFile(file);
  };

  const handleSubmitPayment = async () => {
    if (!paymentFile) {
      alert("❌ Please upload payment screenshot before submitting!");
      return;
    }
    try {
      await uploadPlan(selectedPlan.name.toLowerCase(), paymentFile);
      alert(`✅ ${selectedPlan.name} plan uploaded successfully!`);
      setShowModal(false);
      setPaymentFile(null);
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-200 via-transparent to-green-300 opacity-30 animate-[pulse_6s_ease-in-out_infinite] blur-2xl"></div>

        <div className="relative z-10 py-20 px-6 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0E562B] mb-4 tracking-tight">
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
                  className="group relative bg-white/80 backdrop-blur-md rounded-3xl border border-green-100 shadow-[0_4px_25px_rgba(0,0,0,0.05)] 
              hover:shadow-[0_10px_40px_rgba(34,197,94,0.25)] transition-all duration-500 
              p-8 flex flex-col justify-between min-h-[440px] max-w-sm mx-auto 
              hover:-translate-y-3 hover:scale-[1.03]"
                >
                  {/* Animated Gradient Border on Hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-700"></div>

                  <div className="relative flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold text-[#0E562B] mb-2">{plan.name}</h2>
                    <p className="text-4xl font-extrabold text-green-600 mb-1">₹{plan.price}</p>
                    <p className="text-gray-500 text-sm mb-5">{plan.description}</p>

                    <div className="w-full text-left space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle size={18} className="text-green-600 shrink-0" />
                          <span className="text-[15px] leading-snug truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(plan)}
                    className="relative mt-6 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg text-base transition-all duration-300 hover:scale-[1.05]"
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
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold text-[#0E562B] mb-1">
              {selectedPlan.name} Plan
            </h2>
            <p className="text-3xl font-bold text-green-600 mb-3">
              ₹{selectedPlan.price}
            </p>
            <p className="text-gray-600 mb-5">{selectedPlan.description}</p>

            <div className="bg-gray-100 rounded-xl p-4 mb-5 text-center">
              <p className="text-gray-600 text-sm mb-2 font-medium">
                QR Code for Payment
              </p>
              <div className="w-36 h-36 mx-auto bg-gray-300 rounded flex items-center justify-center overflow-hidden">
                <img
                  src={ScannerIMg}
                  alt="Payment QR"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

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

            <button
              onClick={handleSubmitPayment}
              disabled={loading}
              className="w-full bg-green-700 hover:bg-[#138c2d] text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200 text-lg flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} /> Processing
                  Payment...
                </>
              ) : (
                "Submit Payment"
              )}
            </button>
          </div>
        </div>
      )}

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
