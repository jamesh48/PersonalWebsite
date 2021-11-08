import React from "react";

export const ContactInput = ({ labelName, inputType, valCallback, indicator, localValue }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!localValue) {
      setIsFocused(false);
    }
  };

  return (
    <li
      className={
        isFocused ? `contact-li-r contact-li-r-is-active` : `contact-li-r`
      }
    >
      <label className="contact-label-r">{labelName}</label>
      <div className="contact-child-container-r">
        {inputType === "input" ? (
          <input
            className="contact-input-r"
            type="text"
            value={localValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={() => valCallback(indicator)}
          />
        ) : (
          <textarea
            className={`contact-input-r contact-input-r-textarea`}
            value={localValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={() => valCallback('message')}
          />
        )}
      </div>
    </li>
  );
};
