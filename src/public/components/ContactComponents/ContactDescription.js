import React from "react";

export default ({ title, descriptor }) => {
  return (
    <li className='contact-description-li'>
      <h4 className="contact-column-header-l">{title}</h4>
      <h5 className="contact-column-descriptor-l">{descriptor}</h5>
    </li>
  );
};
