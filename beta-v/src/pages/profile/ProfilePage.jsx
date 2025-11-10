"use client"

import {
  BadgeCheck,
  Briefcase,
  CreditCard,
  Edit2,
  Eye,
  FileText,
  Award as IdCard,
  Mail,
  Save,
  X,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { getAuthUse } from "../../hooks/user/getAuthUse"

export default function ProfilePage() {
  const { getaccesstoken } = useAuth()
  const { getLoggedinuser } = getAuthUse()
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [modified, setModified] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const formRef = useRef(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!getaccesstoken) return
      setLoading(true)
      try {
        const res = await getLoggedinuser(getaccesstoken)
        if (res && res.data && res.data.user) {
          setProfile(res.data.user)
        } else {
          setError("No profile data found")
        }
      } catch (err) {
        console.error(err)
        setError("Failed to fetch profile")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [getaccesstoken])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setIsEditing(false)
        setModified(false)
      }
    }

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => (prev ? { ...prev, [name]: value } : null))
    setModified(true)
  }

  const handleSave = () => {
    if (!modified) return
    // Replace with real API call to update profile
    console.log("Saving profile:", profile)
    setIsEditing(false)
    setModified(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-slate-300 border-t-green-900 animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-medium">
        {error}
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600 font-medium">
        No profile data available
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="relative mb-8 rounded-2xl overflow-hidden shadow-xl bg-white">
          <div className="h-32 sm:h-48 bg-gradient-to-r from-green-900 via-green-800 to-green-700 relative"></div>
          <div className="px-6 sm:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 relative z-10 mb-6">
              <div className="w-32 h-32 rounded-2xl bg-green-900 shadow-lg flex items-center justify-center text-white text-4xl font-bold border-4 border-white">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{profile.name}</h1>
                  {profile.verified && <BadgeCheck className="w-8 h-8 text-green-900" />}
                </div>
                <p className="text-slate-600 mb-3">Member ID: {profile.memId}</p>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="self-start sm:self-center px-6 py-2 rounded-lg bg-green-900 text-white hover:bg-green-800 transition font-semibold flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pt-6 border-t border-slate-200">
              <div>
                <p className="text-sm text-slate-600">Joined</p>
                <p className="font-semibold text-slate-900">
                  {new Date(profile.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Status</p>
                <p className="font-semibold text-green-700">Verified</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Plan</p>
                <p className="font-semibold text-slate-900">{profile.plan?.plan_name || "Standard"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Referrals</p>
                <p className="font-semibold text-slate-900">{profile.referralCount ?? 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Editable Form & Details */}
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Contact & Social */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-900" /> Contact
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Email</p>
                  <a href={`mailto:${profile.email}`} className="text-green-900 font-medium break-all">
                    {profile.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Phone</p>
                  <a href={`tel:${profile.mobno}`} className="text-green-900 font-medium">
                    {profile.mobno}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Account, Plan, Tracking & KYC */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-green-900" /> Account Details
                </h2>
                {isEditing && modified && (
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-green-900 text-white hover:bg-green-800 transition font-semibold flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {["name", "email", "mobno"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize">
                      {field === "mobno" ? "Mobile Number" : field}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={profile[field] || ""}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition ${
                        isEditing
                          ? "bg-slate-50 border-2 border-green-900 focus:outline-none focus:border-green-800"
                          : "bg-slate-50 border border-slate-200 text-slate-700 cursor-default"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Plan & Tracking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-6 border border-green-200">
                <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Your Plan
                </h3>
                <p className="text-3xl font-bold text-green-900 mb-2">{profile.plan?.plan_name || "Standard"}</p>
                <p className="text-sm text-green-700">Active subscription</p>
              </div>

              {profile.trackingId && (
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl shadow-lg p-6 border border-green-200">
                  <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5" /> Tracking ID
                  </h3>
                  <p className="text-2xl font-mono font-bold text-green-900 break-all">{profile.trackingId}</p>
                  <p className="text-sm text-green-700 mt-2">Use for support inquiries</p>
                </div>
              )}
            </div>

            {/* KYC Documents */}
            {(profile.kyc?.adhara_img || profile.kyc?.pan_img) && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-900" /> KYC Documents
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profile.kyc?.adhara_img && (
                    <a
                      href={profile.kyc.adhara_img}
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 rounded-xl border-2 border-slate-200 hover:border-green-900 transition flex items-center gap-3 group"
                    >
                      <IdCard className="w-6 h-6 text-slate-600 group-hover:text-green-900 transition" />
                      <div>
                        <p className="font-semibold text-slate-900">Aadhaar Card</p>
                        <p className="text-sm text-slate-600 group-hover:text-green-900">View Document</p>
                      </div>
                    </a>
                  )}
                  {profile.kyc?.pan_img && (
                    <a
                      href={profile.kyc.pan_img}
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 rounded-xl border-2 border-slate-200 hover:border-green-900 transition flex items-center gap-3 group"
                    >
                      <IdCard className="w-6 h-6 text-slate-600 group-hover:text-green-900 transition" />
                      <div>
                        <p className="font-semibold text-slate-900">PAN Card</p>
                        <p className="text-sm text-slate-600 group-hover:text-green-900">View Document</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
