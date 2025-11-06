import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate=useNavigate();




  const passwordStrength = formData.password.length >= 8;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Please enter a valid email");
      setIsLoading(false);
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }
      alert("Account created successfully!");
      setIsLoading(false);



      setTimeout(() => {
        navigate("/login");
      }, 2000);
  };

  const inputClass = "w-full px-3 py-2 text-sm outline-none";

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#f2f7f1] to-[#e6f3e4]"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#81B633]/30">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="w-12 h-12 mx-auto bg-[#0E562B] text-white rounded-full flex items-center justify-center font-bold text-lg mb-3">
              BM
            </div>
            <h1 className="text-2xl font-bold text-[#0E562B] mb-1">Create Account</h1>
            <p className="text-gray-600 text-sm">Join BM2 Mall and manage your account securely</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
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

            {/* Email */}
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

            {/* Phone */}
            <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#81B633]">
              <Phone size={18} className="text-gray-400" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                className={inputClass}
              />
            </div>

            {/* Password */}
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

            {/* Password Strength */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div
                className={`h-1 flex-1 rounded-full ${
                  passwordStrength ? "bg-[#81B633]" : "bg-gray-300"
                }`}
              />
              <span>{passwordStrength ? "✓ Strong" : "8+ characters"}</span>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-2 text-sm text-gray-600">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 accent-[#81B633]"
              />
              <label htmlFor="terms">
                I agree to the{" "}
                <a href="#" className="text-[#0E562B] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#0E562B] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-green-700 hover:bg-[#74a82e] text-white py-2 text-sm rounded-md font-medium mt-2"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              <ArrowRight size={18} className="ml-2" />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0E562B] hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
