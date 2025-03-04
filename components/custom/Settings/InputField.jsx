import { Input } from "@/components/ui/input";
import React from "react";

const InputField = ({ label, value, onhandleInputChange }) => {
  return (
    <div>
      <label>{label}</label>
      <Input
        value={value}
        onChange={(event) => onhandleInputChange(event.target.value)}
      />
    </div>
  );
};

export default InputField;
