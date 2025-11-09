export const useLogin = () => {
  const login = async (credentials) => {
    try {
      const res = await fetch("http://localhost:8030/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      // ✅ Parse once only
      const data = await res.json().catch(() => ({}));

      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      return data;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  return { login };
};
