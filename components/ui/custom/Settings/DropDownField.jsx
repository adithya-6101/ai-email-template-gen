import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function DropDownField({ label, value, options, onHandleStyleChange }) {
  const safeValue =
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
      ? value
      : "";
  return (
    <div>
      <label>{label}</label>
      <Select
        onValueChange={(v) => onHandleStyleChange(v)}
        defaultValue={safeValue}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option, index) => (
            <SelectItem value={option} key={index}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default DropDownField;
