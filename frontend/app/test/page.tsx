"use client";
import { appClient } from "@/lib/client.ts/appClient";
import axios from "axios";
import { useState } from "react";

function Test() {
  const [mainData, setMainData] = useState("");
  const [mainData2, setMainData2] = useState("");
  const checkCall = async () => {
    const result = await appClient.checkHealth();
    if (result.status === 200) {
      setMainData(result.message);
      setMainData2(result.data);
    }
  };

  checkCall();

  return (
    <div>
      <div>{mainData}</div>
      <div>{mainData2}</div>
    </div>
  );
}

export default Test;
