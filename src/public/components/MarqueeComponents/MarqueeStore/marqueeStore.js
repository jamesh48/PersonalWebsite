// https://stackoverflow.com/questions/59200785/react-usereducer-how-to-combine-multiple-reducers
import React, { useReducer } from 'react';
import CombinedReducers from './marqueeReducers.js';

const MarqueeStoreContext = React.createContext();

const initialState = {
  smileImage: { loaded: false, url: '' }
};

const MarqueeStoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(CombinedReducers, initialState);
  const store = React.useMemo(() => [state, dispatch], [state]);
  return (
    <MarqueeStoreContext.Provider value={store}>{children}</MarqueeStoreContext.Provider>
  );
};

const useMarqueeContext = () => {
  const context = React.useContext(MarqueeStoreContext);
  if (context === undefined) {
    throw new Error('marqueeStore must be used within a MarqueeProvider')
  }
  return context;
};


export { useMarqueeContext, MarqueeStoreProvider };