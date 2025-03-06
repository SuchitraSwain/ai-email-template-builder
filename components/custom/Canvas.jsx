"use client";

import {
  useDragLayoutElement,
  useEmailTemplate,
  useScreenSize,
} from "@/app/provider";
import React, { useEffect } from "react";
import ColumnLayout from "../LayoutElements/ColumnLayout";
import ViewHtmlDialog from "./ViewHtmlDialog";

const Canvas = ({ viewHTMLCode, closeDialog }) => {
  const htmlRef = React.useRef();
  const { screenSize } = useScreenSize();
  const { dragLayoutElement, setDragLayoutElement } = useDragLayoutElement();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const [dragOver, setDragOver] = React.useState(false);
  const [htmlCode, setHtmlCode] = React.useState();

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => {
    setDragOver(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    if (dragLayoutElement && dragLayoutElement.dragLayout) {
      setEmailTemplate((prev) => {
        const filteredPrev = prev.filter(Boolean);

        return [...filteredPrev, dragLayoutElement.dragLayout];
      });
    }
  };

  const getLayoutComponent = (layout) => {
    if (layout?.type === "column") {
      return <ColumnLayout layout={layout} />;
    }
  };

  useEffect(() => {
    viewHTMLCode && getHTMLCode();
  }, [viewHTMLCode]);

  const getHTMLCode = () => {
    if (htmlRef.current) {
      const htmlContent = htmlRef.current.innerHTML;
      setHtmlCode(htmlContent);
    }
  };

  return (
    <div className="mt-20 flex justify-center">
      <div
        className={`p-6 w-full transition-all duration-200
        ${screenSize === "desktop" ? "max-w-2xl" : "max-w-md"} 
        ${dragOver ? "bg-purple-100 p-8" : "bg-white"}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        ref={htmlRef}
      >
        {emailTemplate?.length > 0 ? (
          emailTemplate?.map((layout, index) => (
            <div key={index}>{getLayoutComponent(layout)}</div>
          ))
        ) : (
          <h2 className="p-4 text-center bg-gray-100 border border-dashed">
            Add Layout Here
          </h2>
        )}
      </div>

      <ViewHtmlDialog
        openDialog={viewHTMLCode}
        htmlCode={htmlCode}
        closeDialog={closeDialog}
      />
    </div>
  );
};

export default Canvas;
