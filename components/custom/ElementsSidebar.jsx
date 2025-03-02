import Layout from "@/Data/Layout";
import React from "react";
import ElementLayoutCard from "./ElementLayoutCard";
import ElementList from "@/Data/ElementList";

const ElementsSidebar = () => {
  return (
    <div className="p-5 h-screen shadow-sm">
      <h2 className="font-bold text-lg mb-4">Layout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
        {Layout.map((layout, index) => (
          <ElementLayoutCard key={index} layout={layout} />
        ))}
      </div>

      <h2 className="font-bold text-lg mb-4 mt-6">Element</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
        {ElementList.map((element, index) => (
          <ElementLayoutCard key={index} layout={element} />
        ))}
      </div>
    </div>
  );
};

export default ElementsSidebar;
