import { Input } from "@/components/ui/input";
import React from "react";

const InputStyleField = ({
  label,
  value,
  onhandleInputChange,
  type = "px",
}) => {
  const FormattedValue = (value_) => {
    if (!value_) return "";
    return Number(value_.toString().replace(type, ""));
  };

  return (
    <div>
      <label>{label}</label>
      <div className="flex">
        <Input
          type="number"
          value={FormattedValue(value)}
          onChange={(e) => onhandleInputChange(e.target.value + type)}
        />
        <h2 className="p-1 bg-gray-100 rounded-r-sm -ml-2">{type}</h2>
      </div>
    </div>
  );
};

export default InputStyleField;
