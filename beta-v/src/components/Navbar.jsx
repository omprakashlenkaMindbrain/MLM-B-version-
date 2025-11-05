import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav
            className="w-full bg-green-900 text-white z-50 shadow-lg"
            style={{
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "15px",
                overflow: "hidden",
            }}
        >
            <div className="max-w-[1440px] mx-auto px-6 flex justify-between items-center h-20">
                {/* Logo */}
                <div className="flex items-center space-x-4 text-lg font-bold">
                    <div className="bg-green-700 rounded-full w-12 h-12 flex items-center justify-center shadow">
                        <Link to="/" className="hover:text-green-300 transition">
                            BMX
                        </Link>
                    </div>
                    <span className="text-2xl tracking-wide">BM2 Mall</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10 font-medium text-lg">
                    <Link to="/kyc" className="hover:text-green-300 transition">
                        KYC
                    </Link>
                    <Link to="/plans" className="hover:text-green-300 transition">
                        Plans
                    </Link>
                    <Link to="/profile" className="hover:text-green-300 transition">
                        Profile
                    </Link>
                    <button className="ml-6 bg-white text-green-900 rounded-lg px-6 py-3 font-semibold hover:bg-green-100 shadow transition">
                        Logout
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={30} /> : <Menu size={30} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`md:hidden flex flex-col bg-green-800 text-white px-8 transition-all duration-500 ease-in-out ${isOpen ? "max-h-[400px] py-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
                style={{
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "15px",
                    overflow: "hidden",
                }}
            >
                <a href="#" className="hover:text-green-200 transition text-xl font-medium">
                    Home
                </a>
                <a href="#" className="hover:text-green-200 transition text-xl font-medium">
                    KYC
                </a>
                <a href="#" className="hover:text-green-200 transition text-xl font-medium">
                    Plans
                </a>
                <a href="#" className="hover:text-green-200 transition text-xl font-medium">
                    Profile
                </a>
                <button className="bg-white text-green-900 rounded-lg px-8 py-3 font-semibold hover:bg-green-100 shadow w-fit mt-2">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
