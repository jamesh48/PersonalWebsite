import React from 'react';

import style from './contact.scss';
const { contactContainer, contactChildContainer, contactInput, contactText } = style;

export default ({ globalStyles: { container } }) => {
  return (
    <div className={`${container} ${contactContainer}`} id='contact-root'>
      <div className={contactChildContainer}>
        <p className={contactText}>{'Your Name: '}</p>
        <input className={contactInput} type='text' />
      </div>
      <div className={contactChildContainer}>
        <p className={contactText}>{'Your E-Mail: '}</p>
        <input className={contactInput} type='text' />
      </div>

      <div className={contactChildContainer}>
        <p className={contactText}>{'Your LinkedIn: '}</p>
        <input placeholder='optional' className={contactInput} type='text' />
      </div>

      <div className={contactChildContainer}>
        <p className={contactText}>{'Your Message: '}</p>
        <input className={contactInput} type='text' />
      </div>
    </div>
  );
}