import { Slider } from "@/components/ui/slider";
import React from "react";

const SliderField = ({ label, value, type = "px", onHandleStyleChange }) => {
  const FormattedValue = (value_) => {
    if (!value_) return "";
    return Number(value_.toString().replace(type, ""));
  };

  return (
    <div>
      <label>
        {label} ({value})
      </label>
      <Slider
        defaultValue={[FormattedValue(value)]}
        max={100}
        step={1}
        onValueChange={(v) => onHandleStyleChange(v + type)}
      />
    </div>
  );
};

export default SliderField;
