// https://stackoverflow.com/questions/59200785/react-usereducer-how-to-combine-multiple-reducers
import React, { useReducer } from 'react';
import CombinedReducers from './homeReducers.js';

const HomeStoreContext = React.createContext();

const initialState = {
  floatingButtonsPlacement: '',
};

const HomeStoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(CombinedReducers, initialState);
  const store = React.useMemo(() => [state, dispatch], [state]);
  return (
    <HomeStoreContext.Provider value={store}>{children}</HomeStoreContext.Provider>
  );
};

const useHomeContext = () => {
  const context = React.useContext(HomeStoreContext);
  if (context === undefined) {
    throw new Error('...must be used within a HomeProvider')
  }
  return context;
};


export { useHomeContext, HomeStoreProvider };