import { toast } from "sonner";
import { useState } from "react";

const useFetch = (cb) => {
  const [data, setData] = useState(null); // Initialize with null for clarity
  const [loading, setLoading] = useState(false); // Default to false
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
    } catch (error) {
      setError(error);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false); // Ensure loading is reset
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
