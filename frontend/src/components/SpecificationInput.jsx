import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import FormLabel from "@/components/label/FormLabel";

const PRESET_SPECS = ["1x", "2x", "3x"];

const SpecificationInput = ({ value = [], onChange }) => {
  const [input, setInput] = useState("");

  const addSpec = (spec) => {
    if (!value.includes(spec)) {
      onChange([...value, spec]);
    }
  };

  const removeSpec = (spec) => {
    onChange(value.filter((s) => s !== spec));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      addSpec(input.trim());
      setInput("");
    }
  };

  return (
    <div className="space-y-1">
      <FormLabel labelText="Specification"/>

      <div className="border border-border rounded-lg mt-5 px-3 py-2 flex flex-wrap items-center gap-2 text-sm">
        {/* SELECTED SPECS */}
        {value.map((spec) => (
          <span
            key={spec}
            className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded"
          >
            {spec}
            <button
              type="button"
              onClick={() => removeSpec(spec)}
              className="hover:text-red-500"
            >
              <IoClose size={14} />
            </button>
          </span>
        ))}

        {/* INPUT */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter"
          className="flex-1 min-w-[120px] outline-none bg-transparent text-text-muted"
        />
      </div>

      {/* PRESET OPTIONS */}
      <div className="flex gap-2 mt-2">
        {PRESET_SPECS.map((spec) => (
          <button
            key={spec}
            type="button"
            onClick={() => addSpec(spec)}
            className={`px-3 py-1 rounded border text-sm transition
              ${
                value.includes(spec)
                  ? "bg-primary text-white border-primary"
                  : "border-border text-text-muted hover:bg-muted"
              }`}
          >
            {spec}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpecificationInput;
