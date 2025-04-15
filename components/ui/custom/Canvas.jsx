"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  useScreenSize,
  useDragElementLayout,
  useEmailTemplate,
} from "@/app/Provider";
import ColumnLayout from "@/components/LayoutElements/ColumnLayout";
import ViewHtmlDialog from "./ViewHtmlDialog";
function Canvas({ viewHTMLCode, closeDialog, htmlCode, setHtmlCode }) {
  const htmlRef = useRef();
  const { screenSize, setScreenSize } = useScreenSize();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const [dragOver, setDragOver] = useState(false);
  // const [htmlCode,setHtmlCode]=useState("")
  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
    console.log("over...");
  };
  const onDropHandle = () => {
    setDragOver(false);
    // console.log(dragOver);
    // console.log(dragElementLayout?.dragLayout);

    if (dragElementLayout?.dragLayout) {
      setEmailTemplate((prev) => [...prev, dragElementLayout?.dragLayout]);
    }
  };
  useEffect(() => {
    console.log("Loaded design into Canvas:", emailTemplate);
  }, [emailTemplate]);

  const getLayoutComponent = (layout) => {
    if (layout?.type == "column") {
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

  useEffect(() => {
    const savedHtml = localStorage.getItem("htmlCode");
    if (savedHtml) {
      setHtmlCode(savedHtml);
    }
  }, []);

  useEffect(() => {
    if (htmlCode) {
      localStorage.setItem("htmlCode", htmlCode);
    }
  }, [htmlCode]);

  return (
    <div ref={htmlRef} id="canvas-area" className="mt-20 flex justify-center">
      <div
        className={`bg-white p-6 w-full 
        ${screenSize == "Desktop" ? "max-w-2xl" : "max-w-md"}
        ${dragOver ? "!bg-purple-100 p-4" : "bg-white"}
        `}
        onDragOver={onDragOver}
        onDrop={() => onDropHandle()}
        ref={htmlRef}
      >
        {Array.isArray(emailTemplate) && emailTemplate?.length > 0 ? (
          emailTemplate?.map((layout, index) => (
            <div key={index}>{getLayoutComponent(layout)}</div>
          ))
        ) : (
          <h2 className="p-4 text-center bg-gray-100 border-dashed">
            Add Layout here
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
}

export default Canvas;
