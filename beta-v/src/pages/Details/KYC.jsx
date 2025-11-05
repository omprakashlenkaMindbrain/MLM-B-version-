import { useState } from "react";

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
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* ✅ Custom Success Notification */}
      {showNotification && (
        <div className="absolute top-6 right-6 bg-[#81B633] text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          ✅ KYC Details Submitted Successfully!
        </div>
      )}

      {/* 🏢 Card Container */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg border border-gray-100">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-[#0E562B] rounded-full flex items-center justify-center text-white font-bold text-lg">
            BM2
          </div>
          <h2 className="mt-3 text-2xl font-bold text-[#0E562B]">Complete Your KYC</h2>
          <p className="text-gray-500 text-sm text-center mt-1">
            Required to activate your account and comply with regulations.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Aadhaar Number"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#81B633]"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#81B633]"
              required
            />
          </div>

          {/* Aadhaar Upload */}
          <div className="border rounded-lg p-4">
            <label className="font-semibold text-gray-700">1. Upload Your Aadhaar</label>
            <div className="mt-2 flex items-center justify-between border border-dashed rounded-lg p-3">
              {aadhaar ? (
                <>
                  <span className="text-gray-600 text-sm truncate">{aadhaar.name}</span>
                  <button
                    type="button"
                    className="text-red-500 text-sm font-medium"
                    onClick={() => setAadhaar(null)}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, setAadhaar)}
                  accept=".png,.jpg,.jpeg,.pdf"
                  className="text-sm text-gray-500"
                />
              )}
            </div>
          </div>

          {/* PAN Upload */}
          <div className="border rounded-lg p-4">
            <label className="font-semibold text-gray-700">2. Upload Your PAN</label>
            <div className="mt-2 flex items-center justify-between border border-dashed rounded-lg p-3">
              {pan ? (
                <>
                  <span className="text-gray-600 text-sm truncate">{pan.name}</span>
                  <button
                    type="button"
                    className="text-red-500 text-sm font-medium"
                    onClick={() => setPan(null)}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, setPan)}
                  accept=".png,.jpg,.jpeg,.pdf"
                  className="text-sm text-gray-500"
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#81B633] text-white py-3 rounded-lg font-semibold hover:bg-[#73a02d] transition"
          >
            Submit KYC Details
          </button>
        </form>
      </div>
    </div>
  );
}
