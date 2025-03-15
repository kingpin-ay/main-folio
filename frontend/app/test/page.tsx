"use client";
import { useEffect } from "react";

function Test() {
  const checkCall = async () => {
    const result = await fetch(
      "https://p04ytf3xrh.execute-api.ap-south-1.amazonaws.com/default/",
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
  const checkCallmain = async () => {
    const result = await fetch(
      "https://p04ytf3xrh.execute-api.ap-south-1.amazonaws.com/default/check",
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
    checkCallmain();
  }, []);
  return <div>page</div>;
}

export default Test;
