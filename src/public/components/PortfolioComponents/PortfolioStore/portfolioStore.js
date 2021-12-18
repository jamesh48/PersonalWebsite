// https://stackoverflow.com/questions/59200785/react-usereducer-how-to-combine-multiple-reducers
import React from 'react';
import CombinedReducers from './portfolioReducers.js';

const PortfolioStoreContext = React.createContext();

const initialState = {
  outerContainerData: [],
  portfolioImages: { allLoaded: false, imageArr: [] },
};

const PortfolioStoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(CombinedReducers, initialState);
  const store = React.useMemo(() => [state, dispatch], [state]);
  return (
    <PortfolioStoreContext.Provider value={store}>{children}</PortfolioStoreContext.Provider>
  );
};

const usePortfolioContext = () => {
  const context = React.useContext(PortfolioStoreContext);
  if (context === undefined) {
    throw new Error('portfolioStore must be used within a PortfolioProvider')
  }
  return context;
};


export { usePortfolioContext, PortfolioStoreProvider };