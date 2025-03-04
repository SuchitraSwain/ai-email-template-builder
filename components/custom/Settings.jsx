"use client";

import { useSelectedElement } from "@/app/provider";
import React from "react";
import InputField from "./Settings/InputField";

const Settings = () => {
  const { selectedElement, setSelectedElement } = useSelectedElement();
  const [element, setElement] = React.useState();

  React.useEffect(() => {
    if (selectedElement && selectedElement.layout) {
      setElement(selectedElement.layout[selectedElement.index] || {});
    } else {
      setElement({});
    }
  }, [selectedElement]);

  const onhandleInputChange = (fieldName, value) => {
    console.log("value", value);
    // Copy of your current selectedElement
    const updatedData = { ...selectedElement };

    // Update the specific field with the new value
    updatedData.layout[selectedElement.index][fieldName] = value;

    // Update or set the selectedElement with the new value
    setSelectedElement(updatedData);
  };

  return (
    <div className="p-5">
      <h2 className="font-bold text-xl">Settings</h2>
      {element?.content && (
        <InputField
          label={"Content"}
          value={element?.content || ""}
          onhandleInputChange={(newValue) =>
            onhandleInputChange("content", newValue)
          }
        />
      )}
    </div>
  );
};

export default Settings;
