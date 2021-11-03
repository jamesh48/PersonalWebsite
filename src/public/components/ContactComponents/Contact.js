import React from "react";
// import AdminForm from '../AdminForm/adminForm.js';
// import { AdminFormStoreProvider } from 'AdminFromStore';
import ContactDescription from "./ContactDescription";
import ContactInput from "./ContactInput.js";
import "./contact.scss";

export default ({ mobileBrowser }) => {
  const [formValues, setFormValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedin: "",
    message: "",
  });

  const valCallback = (indicator) => {
    setFormValues((ex) => {
      return { ...ex, [indicator]: event.target.value };
    });
  };

  const handleSubmit = () => {
    event.preventDefault();
  };

  return (
    <div>
      <div
        className={
          mobileBrowser ? `contact-root contact-root--Mobile` : `contact-root`
        }
      >
        <div className="contact-wrapper">
          <div className="contact-column contact-column-l">
            <ul>
              <ContactDescription
                title="Location"
                descriptor="Boulder, Colorado"
              />

              <ContactDescription
                title="E-Mail"
                descriptor="james@fullstackhrivnak.com"
              />
              <ContactDescription title="Phone" descriptor="303-517-2085" />
            </ul>

            {/* <p style={{ color: "ivory", lineHeight: 1.5 }}>
              https://foundationinc.co/contact
            </p> */}
          </div>

          <div className={`contact-column contact-column-r`}>
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="contact-column-form-r"
            >
              <div className="contact-column-form-container-r">
                <ul className="contact-column-form-ul-r">
                  <ContactInput
                    labelName="First Name"
                    inputType="input"
                    localValue={formValues.firstName}
                    valCallback={valCallback}
                    indicator="firstName"
                  />
                  <ContactInput
                    labelName="Last Name"
                    inputType="input"
                    localValue={formValues.lastName}
                    valCallback={valCallback}
                    indicator="lastName"
                  />
                  <ContactInput
                    labelName="Email Address"
                    inputType="input"
                    localValue={formValues.email}
                    valCallback={valCallback}
                    indicator="email"
                  />
                  <ContactInput
                    labelName="LinkedIn"
                    inputType="input"
                    localValue={formValues.linkedin}
                    valCallback={valCallback}
                    indicator="linkedin"
                  />
                  <ContactInput
                    labelName="Your Message: "
                    inputType="textArea"
                    localValue={formValues.message}
                    valCallback={valCallback}
                    indicator="message"
                  />
                  <li className={`contact-li-r contact-li-submit`}>
                    <input type="submit" className="contact-submit-r" />
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <AdminFormStoreProvider>
      <AdminForm/>
    </AdminFormStoreProvider> */}
    </div>
  );
};
