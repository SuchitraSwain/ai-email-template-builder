import { Textarea } from "@/components/ui/textarea";
import React from "react";

const TextAreaField = ({ label, value, onhandleInputChange }) => {
  return (
    <div>
      <label>{label}</label>
      <Textarea
        value={value}
        onChange={(v) => onhandleInputChange(v.target.value)}
      />
    </div>
  );
};

export default TextAreaField;
