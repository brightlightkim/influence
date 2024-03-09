import React from "react";

const BoxWithText = ({ title, text1, text2, text3,text4,text5 }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        <div className="bg-white p-2 rounded-lg shadow-md flex-1">
          <p>{text1}</p>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-md flex-1">
          <p>{text2}</p>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-md flex-1">
          <p>{text3}</p>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-md flex-1">
          <p>{text4}</p>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-md flex-1">
          <p>{text5}</p>
        </div>
      </div>
    </div>
  );
};

export default BoxWithText;