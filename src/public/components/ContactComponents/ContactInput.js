import React from "react";

export default ({ labelName, inputType, valCallback, indicator, localValue }) => {
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={() => valCallback(indicator)}
          />
        ) : (
          <textarea
            className={`contact-input-r contact-input-r-textarea`}
            // placeholder={}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={() => valCallback('message')}
          />
        )}
      </div>
    </li>
  );
};
