import { BadgeCheck, CheckCircle, FileText, User, XCircle,Edit } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    verified: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      console.log("Profile Saved:", profile);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center px-4 sm:px-8 py-10">
      {/* Main Container */}
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-5xl p-6 sm:p-10 mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl hover:bg-green-600 transition shadow-md">
           <User className="text-white w-8 h-8" />
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              {profile.name}
            </h2>
            {profile.verified && (
              <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-xs font-semibold">
                <BadgeCheck className="w-4 h-4" /> Verified
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm">{profile.email}</p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Account Details */}
          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Account Details
              </h3>
              <button
  onClick={handleEditToggle}
  className="flex items-center gap-2 px-4 py-1.5 bg-[#1E3A8A] text-white text-sm rounded-lg hover:bg-blue-800 transition"
>
  {!isEditing && <Edit size={16} />} {/* 👈 Show icon only when not editing */}
  {isEditing ? "Save" : "Edit "}
</button>
            </div>

            <div className="space-y-4 text-sm text-gray-600">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full border rounded-md px-3 py-2 transition ${
                    isEditing
                      ? "border-blue-400 focus:ring focus:ring-blue-200"
                      : "border-gray-200 bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full border rounded-md px-3 py-2 transition ${
                    isEditing
                      ? "border-blue-400 focus:ring focus:ring-blue-200"
                      : "border-gray-200 bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Phone:
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full border rounded-md px-3 py-2 transition ${
                    isEditing
                      ? "border-blue-400 focus:ring focus:ring-blue-200"
                      : "border-gray-200 bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Right: Documents + Subscription */}
          <div className="space-y-6">
            {/* Documents */}
            <div className="border border-gray-200 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Your Documents
              </h3>

              {/* Aadhaar */}
              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="text-gray-600 w-4 h-4" />
                  <div>
                    <p className="font-medium text-gray-800">Aadhaar Card</p>
                    <p className="text-gray-500 text-xs">aadhaar.pdf</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>

              {/* PAN */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="text-gray-600 w-4 h-4" />
                  <div>
                    <p className="font-medium text-gray-800">PAN Card</p>
                    <p className="text-gray-500 text-xs">pan.pdf</p>
                  </div>
                </div>
                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <XCircle className="w-3 h-3" /> Rejected
                </span>
              </div>
            </div>

            {/* Subscription Plan */}
            <div className="border border-gray-200 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Your Subscription Plan
              </h3>
              <div className="bg-[#1E3A8A] text-white p-4 rounded-xl relative">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-lg">Gold Plan</h4>
                    <p className="text-sm">$39/month</p>
                  </div>
                  <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    Paid
                  </span>
                </div>
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Aadhaar card base required to get this</li>
                  <li>Includes all premium benefits</li>
                  <li>24/7 support and updates</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Renews on: <span className="font-medium">October 26, 2024</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
