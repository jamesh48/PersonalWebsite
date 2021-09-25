// https://stackoverflow.com/questions/59200785/react-usereducer-how-to-combine-multiple-reducers
import React, { useReducer } from 'react';
import CombinedReducers from './resumeReducers.js';

const ResumeStoreContext = React.createContext();

const initialState = {
  hoverParams: [null, null],
};

const ResumeStoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(CombinedReducers, initialState);
  const store = React.useMemo(() => [state, dispatch], [state]);
  return (
    <ResumeStoreContext.Provider value={store}>{children}</ResumeStoreContext.Provider>
  );
};

const useResumeContext = () => {
  const context = React.useContext(ResumeStoreContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context;
};


export { useResumeContext, ResumeStoreProvider };