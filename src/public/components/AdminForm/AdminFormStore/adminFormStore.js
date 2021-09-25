import React from 'react';
import CombinedReducers from './adminFormReducers.js';
const AdminFormStoreContext = React.createContext();

const initialState = {
  adminPass: '',
  adminFormShown: false
};

const AdminFormStoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(CombinedReducers,
    initialState);
  const store = React.useMemo(() => [state, dispatch], [state]);
  return (
    <AdminFormStoreContext.Provider value={store}>{children}</AdminFormStoreContext.Provider>
  );
};

const useAdminFormContext = () => {
  const context = React.useContext(AdminFormStoreContext);
  if (context === undefined) {
    throw new Error('useAdminFormContext must be used within a AdminFormProvider')
  }
  return context;
};

export { useAdminFormContext, AdminFormStoreProvider };