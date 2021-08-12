import { useReducer, useContext, createContext } from 'react';

const AuthContext = createContext();
const AuthDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
// eslint-disable-next-line
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { loading: true, data: null });
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export const useAuth = () => useContext(AuthDispatchContext);
