import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const features = [
    {
        title: "Earn with Your Network",
        text: "Build your team and earn generous commissions on every sale.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        ),
    },
    {
        title: "Flexible Plans & Bonuses",
        text: "Choose the perfect plan for your growth with clear incentives.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        ),
    },
    {
        title: "Secure & Transparent",
        text: "Track your sales and earnings with ease and full transparency.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        ),
    },
];

const testimonials = [
    {
        name: "Jane Doe",
        feedback: "I doubled my income within months by joining BM2 Mall. The system is easy to use and truly rewarding.",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        position: "Top Affiliate",
    },
    {
        name: "John Smith",
        feedback: "The transparent plans and community support made me confident in building my team here.",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        position: "Senior Affiliate",
    },
];

function Home() {
    const navigate = useNavigate();

    const navigateToJoin = () => {
        navigate("/join");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
            {/* Hero Section */}
            <section className="px-6 py-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 flex justify-center">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
                        alt="MLM Network"
                        className="w-64 h-64 object-contain"
                    />
                </div>
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-4xl font-extrabold text-green-900 mb-6 leading-snug drop-shadow-lg">
                        Grow Your Income with BM2 Mall's MLM Platform
                    </h1>
                    <p className="text-gray-700 mb-8 text-lg max-w-xl mx-auto lg:mx-0">
                        Join our thriving network and start earning instantly. Build your team, unlock bonuses, and watch your business grow.
                    </p>
                    <button
                        className="px-8 py-4 rounded-lg bg-green-700 hover:bg-green-800 text-white font-bold text-lg transition"
                        onClick={navigateToJoin}
                        style={{cursor:"pointer"}}
                    >
                        Join Now
                    </button>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-3xl font-extrabold text-green-900 mb-14 text-center">
                    How It Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition duration-300">
                        <div className="bg-green-700 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-white font-bold text-xl shadow-md">
                            1
                        </div>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                            Sign Up
                        </h3>
                        <p className="text-gray-600">
                            Create your free account to get started as an affiliate with BM2 Mall.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition duration-300">
                        <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-white font-bold text-xl shadow-md">
                            2
                        </div>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                            Build Network
                        </h3>
                        <p className="text-gray-600">
                            Invite others, build your team, and grow your business organically.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center bg-gradient-to-br from-green-50 via-white to-green-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition duration-300">
                        <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-white font-bold text-xl shadow-md">
                            3
                        </div>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                            Earn Commissions
                        </h3>
                        <p className="text-gray-600">
                            Easily track your earnings and rewards through our secure dashboard.
                        </p>
                    </div>
                </div>
            </section>


            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-3xl font-extrabold text-green-900 mb-12 text-center">Platform Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {features.map((feat, idx) => (
                        <div
                            key={idx}
                            className="bg-green-700 rounded-2xl shadow-lg px-10 py-12 flex flex-col items-center hover:shadow-2xl transition duration-300"
                        >
                            <div className="mb-6">{feat.icon}</div>
                            <h3 className="font-semibold text-xl text-white mb-3">{feat.title}</h3>
                            <p className="text-green-200 text-center">{feat.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <h2 className="text-3xl font-extrabold text-green-900 mb-16 text-center">
                    What Our Members Say
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {testimonials.map(({ name, feedback, avatar, position }, idx) => (
                        <div
                            key={idx}
                            className={`rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 transition-all duration-300 hover:shadow-xl ${idx % 2 === 0
                                    ? "bg-gradient-to-br from-green-50 to-white"
                                    : "bg-gradient-to-br from-white to-green-50"
                                }`}
                        >
                            <div className="relative">
                                <img
                                    src={avatar}
                                    alt={name}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                                />
                                <span className="absolute inset-0 rounded-full border-2 border-green-600 opacity-60 animate-pulse"></span>
                            </div>

                            <div className="text-center sm:text-left">
                                <p className="text-gray-700 italic mb-3 leading-relaxed">
                                    “{feedback}”
                                </p>
                                <p className="font-semibold text-green-900">{name}</p>
                                <p className="text-green-700 text-sm">{position}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Decorative bottom quote */}
                <div className="mt-16 text-center">
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
                        “BM2 Mall empowers individuals to grow together — turning opportunities
                        into income and connections into success.”
                    </p>
                </div>
            </section>


            {/* footer */}
            <Footer />
        </div>
    );
}

export default Home;
