import { useNavigate } from "react-router-dom";


function Footer() {
    const navigate=useNavigate();
    function ClickToNavigate(){
        navigate("/kyc");
    }
    return (
        <section className="bg-green-700 py-12 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="max-w-xl mx-auto mb-6">Join BM2 Mall today and be part of our growing community.</p>
            <button
                className="px-10 py-3 rounded-full bg-white text-green-700 font-bold hover:bg-gray-100 transition"
                style={{cursor:"pointer"}}
                onClick={ClickToNavigate}
            >
                Get Started Now
            </button>
        </section>
    )
}

export default Footer