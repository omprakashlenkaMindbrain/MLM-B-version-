import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const usePlanUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {getaccesstoken}=useAuth();

  const uploadPlan = async (plan_name, paymentFile) => {
    setLoading(true);
    setError(null);

    try {
      if (!plan_name) throw new Error("Please select a plan");
      if (!paymentFile) throw new Error("Please upload a payment screenshot");

      const formData = new FormData();
      formData.append("plan_name", plan_name);
      formData.append("payment_ss", paymentFile);

      const res = await fetch("http://localhost:8030/plan", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getaccesstoken}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Plan upload failed");
      return data;
    } catch (err) {
      console.error("Plan upload error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadPlan, loading, error };
};
