import React from "react";

const ElementLayoutCard = ({ layout }) => {
  return (
    <div
      className="flex items-center justify-center flex-col border border-dashed rounded-xl p-3
    group hover:shadow-md hover:border-primary transition-all cursor-pointer
    "
    >
      {
        <layout.icon className="p-2 h-9 w-9 bg-grey-100 group-hover:text-primary group-hover:bg-purple-100 rounded-full" />
      }
      <h2 className="text-sm group-hover:text-primary">{layout.label}</h2>
    </div>
  );
};

export default ElementLayoutCard;
