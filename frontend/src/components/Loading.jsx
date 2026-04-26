import React from "react";
import { RotateLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <RotateLoader size={13} color="blue"/>
    </div>
  );
};

export default Loading;
