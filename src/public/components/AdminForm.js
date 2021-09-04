import React, { useState } from 'react';

export default ({ handleAdminSubmit, handleAdminChange, adminPass, admin }) => {
  const [input, setInput] = useState(false);

  const handleInputChange = () => {
    setInput((prevInput) => {
      return !prevInput;
    })
  }

  const displayInput = () => {
    if (!input) {
      return (
        <button onClick={handleInputChange}>Admin Login</button>
      )
    } else {
      return (
        <form onSubmit={() => {handleAdminSubmit()}}>
          <input type='text' placeholder='admin password' onChange={handleAdminChange} value={adminPass}></input>
          <button type='submit'>Confirm</button>
          <button onClick={handleInputChange}>Cancel</button>
        </form>
      )
    }
  }

  return (
    <div>
      {displayInput()}
    </div >
  );
};