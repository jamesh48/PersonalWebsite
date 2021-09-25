import React from 'react';
// import AdminForm from '../AdminForm/adminForm.js';
// import { AdminFormStoreProvider } from 'AdminFromStore';
import './contact.scss';

export default ({ mobileBrowser }) => {
  return (
    <div>
    <div className={mobileBrowser ? `contact-root contact-root--Mobile` : `contact-root`}>
      <div className={`${'container'} ${'contactContainer'}`} id='contact-root'>
        <div className={'contactChildContainer'}>
          <p className={'contactText'}>{'Your Name: '}</p>
          <input className={'contactInput'} type='text' />
        </div>
        <div className={'contactChildContainer'}>
          <p className={'contactText'}>{'Your E-Mail: '}</p>
          <input className={'contactInput'} type='text' />
        </div>

        <div className={'contactChildContainer'}>
          <p className={'contactText'}>{'Your LinkedIn: '}</p>
          <input placeholder='optional' className={'contactInput'} type='text' />
        </div>

        <div className={'contactChildContainer'}>
          <p className={'contactText'}>{'Your Message: '}</p>
          <textarea className={'contactInput'} />
        </div>
      </div>
    </div>
    {/* <AdminFormStoreProvider>
      <AdminForm/>
    </AdminFormStoreProvider> */}
    </div>
  );
}