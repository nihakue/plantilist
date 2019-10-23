import React from 'react';

export const AuthContext = React.createContext(null);

export function AuthProvider({children}) {
  const state = React.useState(window.PDK.getSession());
  const [session, setSession] = state;
  return <AuthContext.Provider value={state}>
    {children}
  </AuthContext.Provider>
}

export function LoginButton() {
  const [session, setSession] = React.useContext(AuthContext);
  const onLogin = React.useCallback((response) => {
    if (response.session) {
      setSession(response.session);
    } else {
      console.error(response);
    }
  }, [])
  const login = React.useCallback(() => {
    window.PDK.login({scope: 'read_public,read_private'}, onLogin)
  }, [])
  if (session) {
    return null;
  }
  return <button onClick={login}>Login</button>
}