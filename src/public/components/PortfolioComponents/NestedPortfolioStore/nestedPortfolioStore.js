import React from 'react';
import CombinedReducers from './nestedPortfolioReducers.js';
const NestedPortfolioStoreContext = React.createContext();
const initialState = {
  nestedContainerData: [],
  nestedIndicator: false,
  nestedHovered: null,
  hovered: [null, null]
};
const NestedPortfolioStoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(CombinedReducers,
    initialState);
  const store = React.useMemo(() => [state, dispatch], [state]);
  return (
    <NestedPortfolioStoreContext.Provider value={store}>{children}</NestedPortfolioStoreContext.Provider>
  );
};
const useNestedPortfolioContext = () => {
  const context = React.useContext(NestedPortfolioStoreContext);
  if (context === undefined) {
    throw new Error('useNestedPortfolioContext must be used within a NestedPortfolioProvider')
  }
  return context;
};
export { useNestedPortfolioContext, NestedPortfolioStoreProvider };