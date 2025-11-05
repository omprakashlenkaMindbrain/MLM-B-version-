import { User } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-[#0E562B] text-white shadow-md sticky top-0 z-50 border-b border-[#81B633]/40">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => (window.location.href = "/")}
        >
          <div className="w-10 h-10 bg-[#81B633] rounded-full flex items-center justify-center font-bold text-[#0E562B] shadow-sm border border-[#0E562B]/20">
            BM2
          </div>
          <h1 className="text-xl font-semibold tracking-wide hover:text-[#81B633] transition-colors">
            BM2 Mall
          </h1>
        </div>

        {/* Right Section */}
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#0E562B] border border-[#81B633] rounded-full px-4 py-2 shadow-sm hover:bg-[#0d4a25] transition">
              <User size={18} className="text-[#81B633]" />
              <span className="text-sm font-medium text-white">
                {user.name || "John Doe"}
              </span>
            </div>

            <button
              onClick={onLogout}
              className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg font-semibold transition shadow-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => (window.location.href = "/login")}
            className="border border-[#81B633] text-[#81B633] hover:bg-[#81B633] hover:text-[#0E562B] px-5 py-2 rounded-lg font-semibold shadow-sm transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
