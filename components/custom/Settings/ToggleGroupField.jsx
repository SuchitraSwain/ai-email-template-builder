import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ToggleGroupField = ({ label, value, options, onHandleStyleChange }) => {
  return (
    <div>
      <label>{label}</label>
      <ToggleGroup
        type="single"
        defaultValue={value}
        onValueChange={(v) => onHandleStyleChange(v)}
        className="w-full"
      >
        {options?.map((option, index) => (
          <ToggleGroupItem value={option?.value} key={index}>
            <option.icon />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default ToggleGroupField;
