import { useState } from "react";

const PRIMARY = "#16a34a"; // BM2 Green
const BG_LIGHT = "#f4f8f6";

export default function KYCPage() {
  const [aadhaar, setAadhaar] = useState(null);
  const [pan, setPan] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (aadhaar && pan) {
      console.log("Aadhaar File:", aadhaar);
      console.log("PAN File:", pan);
      alert("✅ KYC Details Submitted Successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      setAadhaar(null);
      setPan(null);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10 sm:px-6 overflow-hidden" style={{ backgroundColor: BG_LIGHT }}>
      {/* Subtle Animated Gradient Blobs */}
      <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-green-200 to-green-400 opacity-30 filter blur-2xl animate-blob-slow"></div>
      <div className="absolute bottom-[-180px] right-[-120px] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-blue-200 to-blue-400 opacity-25 filter blur-2xl animate-blob-slow animation-delay-3000"></div>

      {/* Notification */}
      {showNotification && (
        <div
          className="fixed top-6 right-6 px-6 py-3 z-50 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in"
          style={{ backgroundColor: PRIMARY, color: "#fff" }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">KYC Documents Submitted Successfully!</span>
        </div>
      )}

      {/* KYC Form */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-10 flex flex-col items-center transition-all duration-300 z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div
            style={{ backgroundColor: PRIMARY }}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3 shadow-md"
          >
            BM2
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-1">
            Upload Your KYC Documents
          </h1>
          <p className="text-sm text-gray-500 text-center max-w-sm">
            Please upload your Aadhaar and PAN card for verification. This helps us keep
            your account secure and verified.
          </p>
        </div>

        {/* Aadhaar Upload */}
        <div className="w-full mb-5 bg-[#f9fafb] border border-dashed border-gray-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-base font-medium text-gray-800">1️⃣ Upload Aadhaar</span>
            {aadhaar && (
              <span className="text-gray-700 text-sm font-medium bg-gray-100 px-2 py-1 rounded">{aadhaar.name}</span>
            )}
          </div>
          {aadhaar ? (
            <button
              type="button"
              className="text-sm font-semibold text-red-600 hover:text-red-800"
              onClick={() => setAadhaar(null)}
            >
              Remove
            </button>
          ) : (
            <label className="cursor-pointer text-sm font-semibold text-[var(--accent,#16a34a)] hover:underline">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={(e) => handleFileChange(e, setAadhaar)}
                className="hidden"
                required={!aadhaar}
              />
              Choose File
            </label>
          )}
        </div>

        {/* PAN Upload */}
        <div className="w-full mb-8 bg-[#f9fafb] border border-dashed border-gray-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-base font-medium text-gray-800">2️⃣ Upload PAN</span>
            {pan && (
              <span className="text-gray-700 text-sm font-medium bg-gray-100 px-2 py-1 rounded">{pan.name}</span>
            )}
          </div>
          {pan ? (
            <button
              type="button"
              className="text-sm font-semibold text-red-600 hover:text-red-800"
              onClick={() => setPan(null)}
            >
              Remove
            </button>
          ) : (
            <label className="cursor-pointer text-sm font-semibold text-[var(--accent,#16a34a)] hover:underline">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={(e) => handleFileChange(e, setPan)}
                className="hidden"
                required={!pan}
              />
              Choose File
            </label>
          )}
        </div>

        <button
          type="submit"
          disabled={!aadhaar || !pan}
          className="w-full py-3 rounded-xl font-bold text-white text-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: PRIMARY }}
        >
          Submit KYC Documents
        </button>

        <p className="text-xs text-gray-500 text-center mt-5">
          *Your uploaded documents are encrypted and stored securely.
        </p>
      </form>

      {/* Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob-slow { animation: blob 12s infinite ease-in-out; }
        .animation-delay-3000 { animation-delay: 3s; }

        @keyframes slide-in {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slide-in 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}
