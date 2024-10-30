import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import QuestionViewer from "./QuestionViewer";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <div className="flex justify-center items-center align-middle mt-28">
      <div className=" w-4/5 md:w-3/5">
        <QuestionViewer />
      </div>
    </div>
);
