import { useNavigate } from "react-router-dom";


function Footer() {
    const PRIMARY_NAVY="#1B436D"
    const navigate=useNavigate();
    function ClickToNavigate(){
        navigate("/kyc");
    }
    return (
        <section 
          style={{ backgroundColor: PRIMARY_NAVY }} 
          className="py-16 px-6 text-center text-white"
        >
            <h3 className="text-3xl font-extrabold mb-4">Ready to Start Your Journey?</h3>
            <p className="max-w-xl mx-auto mb-8 text-lg">Join BM2 Mall today and be part of our growing community. Sign up in minutes!</p>
            <button
                className="px-10 py-4 rounded-full font-bold transition shadow-xl"
                style={{
                  cursor:"pointer",
                  backgroundColor: "#fdbb2d",
                  color: "#004aad",
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e6a827"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#fdbb2d"}
                onClick={ClickToNavigate}
            >
                Get Started Now
            </button>
        </section>
    )
}

export default Footer