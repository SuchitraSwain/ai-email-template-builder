import Canvas from "@/components/custom/Canvas";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementsSidebar from "@/components/custom/ElementsSIdebar";
import Settings from "@/components/custom/Settings";
import React from "react";

const Editor = () => {
  return (
    <div>
      <EditorHeader />

      <div className="grid grid-cols-5">
        <ElementsSidebar />
        <div className="col-span-3 bg-gray-100">
          <Canvas />
        </div>
        <Settings />
      </div>
    </div>
  );
};

export default Editor;
