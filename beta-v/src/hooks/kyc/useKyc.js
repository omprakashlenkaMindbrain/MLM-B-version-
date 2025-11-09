import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const useKycUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { getaccesstoken } = useAuth(); // get token from context

  const uploadKyc = async ({ adharFile, panFile }) => {
    setLoading(true);
    setError(null);

    try {
      if (!adharFile || !panFile) throw new Error("Both Aadhaar and PAN images are required");

      const formData = new FormData();
      formData.append("adhara_img", adharFile); // must match backend
      formData.append("pan_img", panFile);       // must match backend

      const res = await fetch("http://localhost:8030/kyc/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getaccesstoken}`, // do NOT set Content-Type
        },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Upload failed");
      }

      const responseData = await res.json();
      setData(responseData);
      return responseData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadKyc, loading, error, data };
};
