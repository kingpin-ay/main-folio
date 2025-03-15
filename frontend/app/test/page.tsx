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
