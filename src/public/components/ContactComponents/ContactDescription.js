import React from "react";

export const ContactDescription = (props) => {
  return (
    <li className='contact-description-li'>
      <h4 className="contact-column-header-l">{props.title}</h4>
      <h5 className="contact-column-descriptor-l">{props.descriptor}</h5>
    </li>
  );
};
