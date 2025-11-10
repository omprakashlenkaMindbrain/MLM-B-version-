import { ArrowRight, Eye, EyeOff, Hash, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobno: "",
    trackingId: "",
    password: "",
  });

  const { signup, loading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.mobno ||
      !formData.trackingId ||
      !formData.password
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields before continuing.",
        confirmButtonColor: "#0E562B",
      });
      return;
    }

    // Call signup (alerts handled inside AuthContext)
    await signup(formData);
  };


  const inputClass = "w-full px-3 py-2 text-sm outline-none";

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#f2f7f1] to-[#e6f3e4]"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#81B633]/30">
          <div className="mb-6 text-center">
            <Link
              to="/"
              className="w-12 h-12 mx-auto bg-[#0E562B] text-white rounded-full flex items-center justify-center font-bold text-lg mb-3"
            >
              BM
            </Link>
            <h1 className="text-2xl font-bold text-[#0E562B] mb-1">Create Account</h1>
            <p className="text-gray-600 text-sm">
              Join BM2 Mall and manage your account securely
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#81B633]">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#81B633]">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#81B633]">
              <Phone size={18} className="text-gray-400" />
              <input
                type="tel"
                name="mobno"
                placeholder="Phone Number"
                value={formData.mobno}
                onChange={handleChange}
                maxLength="10"
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#81B633]">
              <Hash size={18} className="text-gray-400" />
              <input
                type="text"
                name="trackingId"
                placeholder="Tracking ID"
                value={formData.trackingId}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#81B633] relative">
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm pr-10 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center bg-green-700 hover:bg-[#74a82e] text-white py-2 text-sm rounded-md font-medium mt-2"
            >
              {loading ? "Creating Account..." : "Create Account"}
              <ArrowRight size={18} className="ml-2" />
            </button>
          </form>

          <div className="mt-4 text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#0E562B] hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
