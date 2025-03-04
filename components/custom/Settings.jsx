"use client";

import { useSelectedElement } from "@/app/provider";
import React from "react";
import InputField from "./Settings/InputField";
import ColorPickerField from "./Settings/ColorPickerField";
import InputStyleField from "./Settings/InputStyleField";
import SliderField from "./Settings/SliderField";
import TextAreaField from "./Settings/TextAreaField";
import ToggleGroupField from "./Settings/ToggleGroupField";
import {
  AArrowUp,
  AlignCenter,
  AlignLeft,
  AlignRight,
  CaseLower,
  CaseUpper,
} from "lucide-react";
import DropdownField from "./Settings/DropdownField";
import ImagePreview from "./Settings/ImagePreview";

const TextAlignOptions = [
  {
    value: "left",
    icon: AlignLeft,
  },
  {
    value: "center",
    icon: AlignCenter,
  },
  {
    value: "right",
    icon: AlignRight,
  },
];

const TextTransformOptions = [
  {
    value: "uppercase",
    icon: CaseUpper,
  },
  {
    value: "lowercase",
    icon: CaseLower,
  },
  {
    value: "capitalize",
    icon: AArrowUp,
  },
];

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

  const onHandleOuterStyleChange = (fieldName, fieldValue) => {
    let updatedData = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          outerStyle: {
            ...selectedElement?.layout[selectedElement?.index].outerStyle,
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
      {element?.imageUrl && (
        <ImagePreview
          label="Border Radius"
          value={element?.imageUrl}
          onhandleInputChange={(newValue) =>
            onhandleInputChange("imageUrl", newValue)
          }
        />
      )}
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

      {element?.style?.textAlign && (
        <ToggleGroupField
          label={"Textalign"}
          value={element?.style?.textAlign}
          options={TextAlignOptions}
          onHandleStyleChange={(newValue) =>
            onHandleStyleChange("textAlign", newValue)
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

      {element?.style?.textTransform && (
        <ToggleGroupField
          label={"Text Transform"}
          value={element?.style?.textTransform}
          options={TextTransformOptions}
          onHandleStyleChange={(newValue) =>
            onHandleStyleChange("textTransform", newValue)
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

      {element?.style?.margin && (
        <InputStyleField
          label="Margin"
          value={element?.style?.margin}
          onhandleInputChange={(newValue) =>
            onHandleStyleChange("margin", newValue)
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

      {element?.style?.fontWeight && (
        <DropdownField
          label={"Font Weight"}
          value={element?.style?.fontWeight}
          options={[
            "normal",
            "bold",
            "lighter",
            "bolder",
            "100",
            "200",
            "300",
            "400",
            "500",
            "600",
            "700",
            "800",
            "900",
          ]}
          onHandleStyleChange={(newValue) =>
            onHandleStyleChange("fontWeight", newValue)
          }
        />
      )}

      <div>
        <h2 className="font-bold text-xl">Outer Style</h2>
        {element?.outerStyle?.backgroundColor && (
          <ColorPickerField
            label="Background"
            value={element?.outerStyle?.backgroundColor}
            onHandleStyleChange={(newValue) =>
              onHandleOuterStyleChange("backgroundColor", newValue)
            }
          />
        )}
        {element?.outerStyle?.justifyContent && (
          <ToggleGroupField
            label="Align"
            value={element?.outerStyle?.justifyContent}
            options={TextAlignOptions}
            onHandleStyleChange={(newValue) =>
              onHandleOuterStyleChange("justifyContent", newValue)
            }
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
