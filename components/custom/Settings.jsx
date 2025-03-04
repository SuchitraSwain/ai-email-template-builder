"use client";

import { useSelectedElement } from "@/app/provider";
import React from "react";
import InputField from "./Settings/InputField";
import ColorPickerField from "./Settings/ColorPickerField";
import InputStyleField from "./Settings/InputStyleField";
import SliderField from "./Settings/SliderField";
import TextAreaField from "./Settings/TextAreaField";

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
    // Copy of your current selectedElement
    let updatedData = { ...selectedElement };

    // Update the specific field with the new value
    updatedData.layout[selectedElement.index][fieldName] = value;

    // Update or set the selectedElement with the new value
    setSelectedElement(updatedData);
  };

  const onHandleStyleChange = (fieldName, fieldValue) => {
    let updatedData = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          style: {
            ...selectedElement?.layout[selectedElement?.index].style,
            [fieldName]: fieldValue,
          },
        },
      },
    };

    setSelectedElement(updatedData);
  };

  return (
    <div className="p-5 flex flex-col gap-4">
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
      {element?.textarea && (
        <TextAreaField
          label={"Textarea"}
          value={element?.textarea || ""}
          onhandleInputChange={(newValue) =>
            onhandleInputChange("textarea", newValue)
          }
        />
      )}
      {element?.url && (
        <InputField
          label={"url"}
          value={element?.url || ""}
          onhandleInputChange={(newValue) =>
            onhandleInputChange("url", newValue)
          }
        />
      )}
      {element?.style?.width && (
        <SliderField
          label="Width"
          type="%"
          value={element?.style?.width}
          onHandleStyleChange={(newValue) =>
            onHandleStyleChange("width", newValue)
          }
        />
      )}
      {element?.style?.backgroundColor && (
        <ColorPickerField
          label="Background"
          value={element?.style?.backgroundColor}
          onHandleStyleChange={(newValue) =>
            onHandleStyleChange("backgroundColor", newValue)
          }
        />
      )}
      {element?.style?.color && (
        <ColorPickerField
          label="Text color"
          value={element?.style?.color}
          onHandleStyleChange={(newValue) =>
            onHandleStyleChange("color", newValue)
          }
        />
      )}
      {element?.style?.fontSize && (
        <InputStyleField
          label="Font Size"
          value={element?.style?.fontSize}
          onhandleInputChange={(newValue) =>
            onHandleStyleChange("fontSize", newValue)
          }
        />
      )}

      {element?.style?.padding && (
        <InputStyleField
          label="Padding"
          value={element?.style?.padding}
          onhandleInputChange={(newValue) =>
            onHandleStyleChange("padding", newValue)
          }
        />
      )}

      {element?.style?.borderRadius && (
        <SliderField
          label="Border Radius"
          value={element?.style?.borderRadius}
          onHandleStyleChange={(newValue) =>
            onHandleStyleChange("borderRadius", newValue)
          }
        />
      )}
    </div>
  );
};

export default Settings;
