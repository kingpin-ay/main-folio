"use client";
import axios from "axios";
import { useState } from "react";

function Test() {
  const [mainData, setMainData] = useState("");
  const [mainData2, setMainData2] = useState("");
  const checkCall = async () => {
    const result = await axios.get(
      `https://p04ytf3xrh.execute-api.ap-south-1.amazonaws.com/default/update`
    );
    console.log(result.data);
    setMainData(result.data);
  };

  const checkCall1 = async () => {
    const result = await axios.get(
      `https://p04ytf3xrh.execute-api.ap-south-1.amazonaws.com/default`
    );
    console.log(result.data);
    setMainData2(`${result.data} + /update`);
  };

  checkCall();
  checkCall1();
  return (
    <div>
      <div>{mainData}</div>
      <div>{mainData2}</div>
    </div>
  );
}

export default Test;
