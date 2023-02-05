import React, { useState } from "react";

function Modal({
  languages,
  setTargetLanguage,
  setOpen,
  targetLanguage,
  searchedLanguage,
  setSearchedLanguage,
}) {
  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().startsWith(searchedLanguage.toLowerCase())
  );

  return (
    <div className="overflow-auto h-72 w-72">
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
