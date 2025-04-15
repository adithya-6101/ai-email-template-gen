"use client";
import React, { useState } from "react";
import {
  useEmailTemplate,
  useDragElementLayout,
  useSelectedElement,
} from "@/app/Provider";
import ButtonComponent from "../ui/custom/Element/ButtonComponent";
import TextComponent from "../ui/custom/Element/TextComponent";
import ImageComponent from "../ui/custom/Element/ImageComponent";
import LogoComponent from "../ui/custom/Element/LogoComponent";
import DividerComponent from "../ui/custom/Element/DividerComponent";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";
import LogoHeaderComponent from "../ui/custom/Element/LogoHeaderComponent";
import SocialIconsComponent from "../ui/custom/Element/SocialIconsComponent";

function ColumnLayout({ layout }) {
  const [dragOver, setDragOver] = useState();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
  const { selectedElement, setSelectedElement } = useSelectedElement();
  const onDragOverHandle = (event, index) => {
    event.preventDefault();
    setDragOver({
      index: index,
      columnId: layout?.id,
    });
  };

  const onDropHandle = () => {
    const index = dragOver.index;
    setEmailTemplate((prevItem) =>
      prevItem?.map((col) =>
        col.id === layout?.id
          ? { ...col, [index]: dragElementLayout?.dragElement }
          : col
      )
    );
    setDragOver(null);
  };

  const getElementComponent = (element) => {
    console.log(element);
    if (element?.type == "Button") {
      return <ButtonComponent {...element} />;
    } else if (element?.type == "Text") {
      return <TextComponent {...element} />;
    } else if (element?.type == "Image") {
      return <ImageComponent {...element} />;
    } else if (element?.type == "Logo") {
      return <LogoComponent {...element} />;
    } else if (element?.type == "Divider") {
      return <DividerComponent {...element} />;
    } else if (element?.type == "LogoHeader") {
      return <LogoHeaderComponent {...element} />;
    } else if (element?.type == "SocialIcons") {
      return <SocialIconsComponent {...element} isEditable={true} />;
    }
    return element?.type;
  };

  const deleteLayout = (layoutId) => {
    const updateEmailTemplate = emailTemplate?.filter(
      (item) => item.id != layoutId
    );
    setEmailTemplate(updateEmailTemplate);
    setSelectedElement(null);
  };

  const moveItemUp = (layoutId) => {
    const index = emailTemplate.findIndex((item) => item.id === layoutId);
    if (index > 0) {
      setEmailTemplate((prevItems) => {
        const updatedItems = [...prevItems];
        // Debug logs (optional)

        // swap the current items with the one above it
        [updatedItems[index], updatedItems[index - 1]] = [
          updatedItems[index - 1],
          updatedItems[index],
        ];
        return updatedItems;
      });
    }
  };

  const moveItemDown = (layoutId) => {
    const index = emailTemplate.findIndex((item) => item.id === layoutId);
    if (index < emailTemplate.length - 1) {
      setEmailTemplate((prevItems) => {
        const updatedItems = [...prevItems]; // make a copy of the previous state

        // Correctly swap the current item with the one below it
        [updatedItems[index], updatedItems[index + 1]] = [
          updatedItems[index + 1],
          updatedItems[index],
        ];

        return updatedItems; // return the updated items array
      });
    }
  };

  return (
    <div className="relative">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol},1fr)`,
          gap: "0px",
        }}
        className={`${selectedElement?.layout?.id == layout?.id && "border border-dashed border-blue-500"}`}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, index) => (
          <div
            key={index}
            className={`p-0 flex items-center h-full w-full bg-white cursor-pointer
            ${!layout?.[index]?.type && " bg-gray-100 border border-dashed justify-center "}
             ${index == dragOver?.index && dragOver?.columnId ? "bg-green-100" : "bg-gray-100"}
             ${
               selectedElement?.layout?.id == layout?.id &&
               selectedElement?.index == index &&
               "border-blue-500 border-4"
             }
             `}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDrop={onDropHandle}
            onClick={() => setSelectedElement({ layout: layout, index: index })}
          >
            {getElementComponent(layout?.[index]) ?? "Drag Element Here"}
          </div>
        ))}
        {selectedElement?.layout?.id == layout?.id && (
          <div className="absolute -right-10 flex gap-2 flex-col">
            <div
              className="absolute -right-10 cursor-pointer
            bg-gray-100 p-2 rounded-full hover:scale-105 
            transition-all hover:shadow-md"
              onClick={() => deleteLayout(layout?.id)}
            >
              <Trash className="h-4 w-4 text-red-500" />
            </div>

            <div
              className="cursor-pointer
            bg-gray-100 p-2 rounded-full hover:scale-105 
            transition-all hover:shadow-md"
              onClick={() => moveItemUp(layout.id)}
            >
              <ArrowUp className="h-4 w-4" />
            </div>

            <div
              className="cursor-pointer
            bg-gray-100 p-2 rounded-full hover:scale-105 
            transition-all hover:shadow-md"
              onClick={() => moveItemDown(layout.id)}
            >
              <ArrowDown className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ColumnLayout;
