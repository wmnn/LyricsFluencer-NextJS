import React, { useState } from "react";
import { languages } from "../../staticData.js";

function Modal({
  setTargetLanguage,
  setOpen,
  searchedLanguage,
  setSearchedLanguage,
}) {
  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().startsWith(searchedLanguage.toLowerCase())
  );

  return (
    <div className="overflow-auto relative h-72 w-full">
      {filteredLanguages.map((o, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setTargetLanguage(o.language);
              setSearchedLanguage(o.name);
              setOpen((prev) => !prev);
            }}
          >
            {" "}
            {o.name}
          </div>
        );
      })}
    </div>
  );
}

export default Modal;
