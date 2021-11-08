// https://stackoverflow.com/questions/59200785/react-usereducer-how-to-combine-multiple-reducers
import React, { useReducer } from 'react';
import CombinedReducers from './globalReducers.js';

const GlobalStoreContext = React.createContext();

const initialState = {
  mobileBrowser: null,
  smallWindow: null,
  admin: false,
  portrait: false
};

const GlobalStoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(CombinedReducers, initialState);
  const store = React.useMemo(() => [state, dispatch], [state]);
  return (
    <GlobalStoreContext.Provider value={store}>{children}</GlobalStoreContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = React.useContext(GlobalStoreContext);
  if (context === undefined) {
    throw new Error('globalStore must be used within a GlobalProvider')
  }
  return context;
};


export { useGlobalContext, GlobalStoreProvider };