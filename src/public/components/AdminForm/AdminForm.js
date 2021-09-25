import React from 'react';
import { useGlobalContext } from 'GlobalStore';
import { useAdminFormContext } from 'AdminFormStore';
import './adminForm.scss';

export default () => {
  const [{ admin }, globalDispatch] = useGlobalContext();
  const [{ adminPass, adminFormShown }, adminFormDispatch] = useAdminFormContext()

  React.useEffect(() => {
    adminFormDispatch({ type: 'UPDATE ADMIN PASS', payload: '' });
  }, [admin])

  const handleAdminPassValueChange = () => {
    adminFormDispatch({ type: 'UPDATE ADMIN PASS', payload: event.target.value })
  };

  const handleAdminSubmit = () => {
    event.preventDefault();
    if (adminPass === 'jambob') {
      globalDispatch({ type: 'ADMIN LOGIN' });
    };
  };

  const clickHandler = () => {
    if (!adminFormShown) {
      adminFormDispatch({ type: 'TOGGLE ADMIN FORM SHOWN TRUE' });
    } else {
      if (admin) {
        globalDispatch({ type: 'ADMIN LOGOUT' })
      }
      adminFormDispatch({ type: 'TOGGLE ADMIN FORM SHOWN FALSE' });
    }
  };


  const displayInput = () => {
    if (admin) {
      return <button onClick={clickHandler}>Exit</button>
    }
    if (!adminFormShown) {
      return <button onClick={clickHandler}>Admin Login</button>
    } else {
      return (
        <form onSubmit={handleAdminSubmit}>
          <input type='text' placeholder='admin password' onChange={handleAdminPassValueChange} value={adminPass}></input>
          <button type='submit'>Confirm</button>
          <button onClick={clickHandler}>Cancel</button>
        </form>
      )
    }
  }

  return (
    <div id='admin-login'>
      {displayInput()}
    </div >
  );
};