"use client";
import axios from "axios";
import { useState } from "react";

function Test() {
  const [mainData, setMainData] = useState();
  const checkCall = async () => {
    const result = await axios.get(
      `https://p04ytf3xrh.execute-api.ap-south-1.amazonaws.com/default/`
    );
    console.log(result.data);
    setMainData(result.data);
  };

  checkCall();
  return <div>{mainData}</div>;
}

export default Test;
