import React from "react";
import { ClipLoader } from "react-spinners";

const ButtonLoading = () => {
  return (
    <div className="flex justify-center items-center">
      <ClipLoader color="white" />
    </div>
  );
};

export default ButtonLoading;
