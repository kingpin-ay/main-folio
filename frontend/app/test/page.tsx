"use client";
import { useEffect } from "react";

function Test() {
  const checkCall = async () => {
    const result = await fetch(
      "https://2r5ixl6xr9.execute-api.ap-south-1.amazonaws.com/default/hono-portfolio-backend/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors", // Ensure CORS is enabled
      }
    );
    console.log("response check for the hono-lambda -> ", result.body, result);
  };

  useEffect(() => {
    checkCall();
  }, []);
  return <div>page</div>;
}

export default Test;
