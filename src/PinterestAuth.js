import React from 'react';

export const AuthContext = React.createContext(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({children}) {
  const state = React.useState(window.PDK.getSession());
  return <AuthContext.Provider value={state}>
    {children}
  </AuthContext.Provider>
}

export function LoginButton() {
  const [session, setSession] = useAuth();
  const onLogin = React.useCallback((response) => {
    if (response.session) {
      setSession(response.session);
    } else {
      console.error(response);
    }
  }, [setSession])
  const login = React.useCallback(() => {
    window.PDK.login({scope: 'read_public,read_private'}, onLogin)
  }, [onLogin])
  if (session) {
    return null;
  }
  return <button onClick={login}>Login</button>
}