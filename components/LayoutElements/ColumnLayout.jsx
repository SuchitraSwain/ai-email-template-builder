"use client";

import {
  useDragLayoutElement,
  useEmailTemplate,
  useSelectedElement,
} from "@/app/provider";
import React from "react";
import ButtonComponent from "../custom/Element/ButtonComponent";
import TextComponent from "../custom/Element/TextComponent";
import ImageComponent from "../custom/Element/ImageComponent";
import LogoComponent from "../custom/Element/LogoComponent";
import DividerComponent from "../custom/Element/DividerComponent";
import LogoHeaderComponent from "../custom/Element/LogoHeaderComponent";
import SocialIconComponent from "../custom/Element/SocialIconComponent";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";

const ColumnLayout = ({ layout }) => {
  const [dragOver, setDragOver] = React.useState();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragLayoutElement, setDragLayoutElement } = useDragLayoutElement();
  const { selectedElement, setSelectedElement } = useSelectedElement();

  const onDragOverHandler = (event, index) => {
    event.preventDefault();
    setDragOver({
      index: index,
      columnId: layout?.id,
    });
  };

  const onDropHandler = () => {
    const index = dragOver.index;

    setEmailTemplate((prevItem) =>
      prevItem?.map((col) =>
        col?.id === layout?.id
          ? { ...col, [index]: dragLayoutElement?.dragElement }
          : col
      )
    );
    setDragOver(null);
  };

  const getElementComponent = (element) => {
    if (element?.type === "Button") {
      return <ButtonComponent {...element} />;
    } else if (element?.type === "Text") {
      return <TextComponent {...element} />;
    } else if (element?.type === "Image") {
      return <ImageComponent {...element} />;
    } else if (element?.type === "Logo") {
      return <LogoComponent {...element} />;
    } else if (element?.type === "Divider") {
      return <DividerComponent {...element} />;
    } else if (element?.type === "LogoHeader") {
      return <LogoHeaderComponent {...element} />;
    } else if (element?.type === "SocialIcons") {
      return <SocialIconComponent {...element} />;
    }
    return element?.type;
  };

  const deleteLayout = (layoutId) => {
    const updateEmailtemplate = emailTemplate?.filter(
      (item) => item?.id !== layoutId
    );
    setEmailTemplate(updateEmailtemplate);
  };

  const moveItemUp = (layoutId) => {
    const index = emailTemplate?.findIndex((item) => item?.id === layoutId);
    if (index > 0) {
      setEmailTemplate((prevItems) => {
        const updateItems = [...prevItems];
        //swap the current item with the one above it
        [updateItems[index], updateItems[index - 1]] = [
          updateItems[index - 1],
          updateItems[index],
        ];
        return updateItems;
      });
    }
  };

  const moveItemDown = (layoutId) => {
    const index = emailTemplate?.findIndex((item) => item?.id === layoutId);
    if (index < emailTemplate.length - 1) {
      setEmailTemplate((prevItems) => {
        const updateItems = [...prevItems];
        [updateItems[index], updateItems[index + 1]] = [
          updateItems[index + 1],
          updateItems[index],
        ];
        return updateItems;
      });
    }
  };

  return (
    <div className="relative">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
          gap: "0px",
        }}
        className={`${selectedElement?.layout?.id === layout?.id ? "border border-dashed border-blue-500" : ""}`}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, index) => (
          <div
            key={index}
            className={`p-0 flex items-center justify-center cursor-pointer
              ${!layout?.[index]?.type && "bg-gray-100 border border-dashed"} 
              ${index === dragOver?.index && dragOver?.columnId ? "bg-green-100" : ""}
              ${selectedElement?.layout?.id === layout?.id && selectedElement?.index === index ? "border-3 border-blue-500" : ""}
            `}
            onDragOver={(event) => onDragOverHandler(event, index)}
            onDrop={onDropHandler}
            onClick={() => setSelectedElement({ layout: layout, index: index })}
          >
            {getElementComponent(layout?.[index]) ?? "Drag Element Here"}
          </div>
        ))}

        {selectedElement?.layout?.id === layout?.id && (
          <div className="absolute -right-10 flex gap-2 flex-col">
            <div
              className=" bg-gray-100 p-2 rounded-full 
          cursor-pointer hover:scale-105 transition-all hover:shadow-md"
              onClick={() => deleteLayout(layout?.id)}
            >
              <Trash className="h-4 w-4 text-rose-500" />
            </div>
            <div
              className=" bg-gray-100 p-2 rounded-full 
          cursor-pointer hover:scale-105 transition-all hover:shadow-md"
              onClick={() => moveItemUp(layout?.id)}
            >
              <ArrowUp className="h-4 w-4" />
            </div>
            <div
              className=" bg-gray-100 p-2 rounded-full 
          cursor-pointer hover:scale-105 transition-all hover:shadow-md"
              onClick={() => moveItemDown(layout?.id)}
            >
              <ArrowDown className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColumnLayout;
