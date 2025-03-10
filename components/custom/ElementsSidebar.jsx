"use client";

import Layout from "@/Data/Layout";
import React from "react";
import ElementLayoutCard from "./ElementLayoutCard";
import ElementList from "@/Data/ElementList";
import { useDragLayoutElement } from "@/app/provider";

const ElementsSidebar = () => {
  const { dragLayoutElement, setDragLayoutElement } = useDragLayoutElement();

  const onDragLayoutStart = (layout) => {
    setDragLayoutElement({
      dragLayout: {
        ...layout,
        id: Date.now(),
      },
    });
  };

  const onDragElementStart = (element) => {
    setDragLayoutElement({
      dragElement: {
        ...element,
        id: Date.now(),
      },
    });
  };

  return (
    <div className="p-5 h-screen shadow-sm">
      <h2 className="font-bold text-lg mb-4">Layout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
        {Layout.map((layout, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => onDragLayoutStart(layout)}
          >
            <ElementLayoutCard layout={layout} />
          </div>
        ))}
      </div>

      <h2 className="font-bold text-lg mb-4 mt-6">Element</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
        {ElementList?.map((element, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => onDragElementStart(element)}
          >
            <ElementLayoutCard layout={element} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElementsSidebar;
