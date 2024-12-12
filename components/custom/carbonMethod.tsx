import { CarbonMethodOptions } from "@/lib/constants";
import React, { Dispatch, SetStateAction } from "react";

type CarbonMethodsProps = {
  selectedMethods: number[];
  setSelectedMethods: Dispatch<SetStateAction<number[]>>;
};

const CarbonMethods = ({
  selectedMethods,
  setSelectedMethods,
}: CarbonMethodsProps) => {
  const toggleMethod = (index: number) => {
    setSelectedMethods((prevSelectedMethods) =>
      prevSelectedMethods.includes(index)
        ? prevSelectedMethods.filter((i) => i !== index)
        : [...prevSelectedMethods, index]
    );
  };

  return (
    <div className="p-2 py-6 flex items-center gap-3">
      <span>Carbon methods:</span>
      <div className="flex items-center gap-3">
        {CarbonMethodOptions.map((method, index) => (
          <div
            key={method.title}
            title={method.title}
            style={{
              opacity: selectedMethods.includes(index) ? 1 : 0.5,
              cursor: "pointer",
            }}
            onClick={() => toggleMethod(index)}
          >
            <method.icon />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarbonMethods;
