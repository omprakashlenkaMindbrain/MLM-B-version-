import { ArrowRight, Eye, EyeOff, Lock, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.phone || !formData.password) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number");
      setIsLoading(false);
      return;
    }

    // Simulate login API call
    setTimeout(() => {
      // Save login info if "Remember me" checked
      if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify(formData));
      } else {
        localStorage.removeItem("rememberedUser");
      }

      // Use context login function
      login({ phone: formData.phone });
      setIsLoading(false);
    }, 1000);
  };

  const inputClass = "w-full px-3 py-2 text-sm outline-none placeholder-gray-400";

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-gray-50">
      <div className="absolute inset-0 -z-10 animate-gradient-bg"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#81B633]/20">
          {/* Header */}
          <div className="mb-6 text-center">
            <Link to="/" className="w-14 h-14 mx-auto bg-[#0E562B] text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-lg">
              BM
            </Link>
            <h1 className="text-3xl font-bold text-[#0E562B] mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-sm">Sign in to continue to BM2 Mall</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone */}
            <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#81B633] px-3 py-2 rounded-md">
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
            <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#81B633] px-3 py-2 rounded-md relative">
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 text-sm outline-none placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-gray-600 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 rounded border-gray-300 accent-[#81B633]"
                />
                Remember me
              </label>
              <a href="#" className="hover:underline text-[#0E562B] font-medium">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-green-700 hover:bg-[#74a82e] text-white py-2 rounded-md font-medium mt-2 transition-all"
            >
              {isLoading ? "Signing in..." : "Sign in"}
              <ArrowRight size={18} className="ml-2" />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#0E562B] hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Gradient Animation */}
      <style>{`
        @keyframes gradientBG {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
        .animate-gradient-bg {
          background: linear-gradient(270deg, #e6f3e4, #f2f7f1, #d4e8d0);
          background-size: 600% 600%;
          animation: gradientBG 20s ease infinite;
          position: absolute;
          inset: 0;
          z-index: -1;
        }
      `}</style>
    </div>
  );
}
