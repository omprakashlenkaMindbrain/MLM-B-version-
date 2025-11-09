import {
  BadgeCheck,
  CheckCircle,
  Eye,
  FileText,
  Loader2,
  Pencil,
  User,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEditUser } from "../../hooks/user/useEditUser";

export default function ProfilePage() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { editUser, loading, error, successMsg } = useEditUser();

  useEffect(() => {
    if (authUser) setProfile(authUser.user);
  }, [authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = async () => {
    if (isEditing) {
      try {
        await editUser(
          {
            name: profile.name,
            email: profile.email,
            mobno: profile.mobno,
          },
          authUser.token
        );
        alert("✅ Profile updated successfully!");
      } catch (err) {
        alert(`❌ ${err.message}`);
      }
    }
    setIsEditing((prev) => !prev);
  };

  if (!profile)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f1f5f9] via-[#fafcff] to-[#c3e8ff] flex justify-center items-start py-14 px-4 sm:px-8">
      <article className="max-w-7xl w-full grid grid-cols-1 xl:grid-cols-6 gap-10">
        {/* Profile Info */}
        <section className="xl:col-span-2 bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-700 w-20 h-20 rounded-full flex items-center justify-center shadow-md hover:bg-green-600 transition">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="mt-14 text-3xl font-extrabold text-gray-800">{profile.name}</h2>
          {profile.verified && (
            <span className="mt-2 inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold shadow-sm border">
              <BadgeCheck className="w-5 h-5" /> Verified
            </span>
          )}
          <p className="mt-1 text-sm text-gray-600 break-words">{profile.email}</p>
          <p className="text-xs text-gray-500 mt-3">Last login: Nov 8, 2025</p>

          {/* Tracking ID section */}
          {profile.trackingId && (
            <div className="mt-8 w-full bg-blue-50 border border-blue-300 rounded-xl p-4 text-center">
              <div className="flex justify-center items-center gap-3 text-blue-700 font-semibold text-lg sm:text-xl">
                <Eye className="w-6 h-6" />
                <span>Your Tracking ID: {profile.trackingId}</span>
              </div>
              <p className="mt-2 text-xs text-blue-600 italic max-w-xs mx-auto sm:max-w-md">
                Here it is your tracking id, through this id you can add two members under you.
              </p>
            </div>
          )}
        </section>

        {/* Details and Documents */}
        <section className="xl:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Account Details */}
          <div className="bg-white border-2 border-blue-100 rounded-3xl shadow-lg p-6">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                <User className="w-5 h-5" /> Account Details
              </h3>
              <button
                onClick={handleToggleEdit}
                disabled={loading}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold shadow-sm transition ${
                  loading
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : isEditing
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-blue-700 text-white hover:bg-blue-800"
                }`}
              >
                {loading && <Loader2 className="animate-spin w-5 h-5" />}
                {!loading && (
                  <>
                    <Pencil className="w-5 h-5" />
                    {isEditing ? " Save" : " Edit"}
                  </>
                )}
              </button>
            </header>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {[
                { label: "Name", name: "name", type: "text", value: profile.name },
                { label: "Email", name: "email", type: "email", value: profile.email },
                { label: "Phone", name: "mobno", type: "text", value: profile.mobno || "" },
              ].map(({ label, name, type, value }) => (
                <div key={name}>
                  <label className="block text-gray-600 font-semibold mb-1">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded-lg px-4 py-2 text-gray-800 bg-gray-50 focus:outline-none transition ${
                      isEditing
                        ? "border-2 border-blue-400 focus:ring-2 focus:ring-blue-300"
                        : "border border-gray-200 cursor-not-allowed"
                    }`}
                  />
                </div>
              ))}
            </form>

            {error && <p className="text-red-600 text-xs mt-2">❌ {error}</p>}
            {successMsg && <p className="text-green-600 text-xs mt-2">✅ {successMsg}</p>}
          </div>

          {/* Documents & Subscription */}
          <div className="space-y-8">
            <section className="bg-white border-2 border-green-100 rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-green-800 mb-5 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Your Documents
              </h3>

              {[
                { id: "aadhaar", name: "Aadhaar Card", file: "aadhaar.pdf", verified: true },
                { id: "pan", name: "PAN Card", file: "pan.pdf", verified: false },
              ].map(({ id, name, file, verified }) => (
                <div
                  key={id}
                  className="flex justify-between items-center py-3 px-4 rounded-lg bg-gray-50 shadow transition"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-semibold text-gray-900">{name}</p>
                      <p className="text-xs text-gray-500">{file}</p>
                    </div>
                  </div>
                  {verified ? (
                    <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold border border-green-500">
                      <CheckCircle className="w-4 h-4" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold border border-red-500">
                      <XCircle className="w-4 h-4" /> Rejected
                    </span>
                  )}
                </div>
              ))}
            </section>

            <section className="bg-white border-2 border-yellow-100 rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-yellow-600 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Subscription Plan
              </h3>
              <div className="rounded-xl p-5 bg-gradient-to-r from-[#1E3A8A] to-[#f59e0b] text-white shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-lg">Gold Plan</h4>
                    <p className="text-sm">$39/month</p>
                  </div>
                  <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-bold">
                    Paid
                  </span>
                </div>
                <ul className="text-sm mt-3 space-y-1 list-disc list-inside">
                  <li>Aadhaar card base required to get this</li>
                  <li>Includes all premium benefits</li>
                  <li>24/7 support and updates</li>
                </ul>
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                Renews on: <time className="font-semibold">October 26, 2024</time>
              </p>
            </section>
          </div>
        </section>
      </article>
    </main>
  );
}
