import React, { useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    setLoading(true);
    try {
      const res = await axios.post(
        url,
        { credential: response.credential },
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      console.log(res);
      if (res) {
        setLoading(false);
        const data = res.data;
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          window.location.reload();
        }
        throw new Error(data?.message || data);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setLoading(false);
      }, 500);

      setError(error.response.data.message);
    }
  };

  return { loading, error, handleGoogle, setError };
};

export default useFetch;
