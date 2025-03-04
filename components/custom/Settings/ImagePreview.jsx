import { Input } from "@/components/ui/input";
import React from "react";

const ImagePreview = ({ label, value, onhandleInputChange }) => {
  return (
    <div>
      <label>{label}</label>
      <img
        src={value}
        alt="Preview"
        className="w-full h-[150px] object-contain border rounded-md"
      />
      <Input
        onChange={(v) => onhandleInputChange(v.target.value)}
        className="mt-2"
      />
    </div>
  );
};

export default ImagePreview;
