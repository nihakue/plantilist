import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import React from 'react';
import ErrorBoundary from 'react-error-boundary';
import './App.css';
import { AuthProvider, LoginButton, useAuth } from './PinterestAuth';
import { Landing } from './Landing';
import { Board } from './Board';
import { useLocation } from "react-router-dom";

const MyFallbackComponent = ({ componentStack, error }) => (
  <div>
    <p><strong>Oops! An error occured!</strong></p>
    <p>Here’s what we know…</p>
    <p><strong>Error:</strong> {JSON.stringify(error)}</p>
    <p><strong>Stacktrace:</strong> {componentStack}</p>
  </div>
);

function PageContainer({children}) {
  return (
  <main>
    <AuthProvider>
      <ErrorBoundary FallbackComponent={MyFallbackComponent}>
        <React.Suspense fallback={"loading..."}>
          {children}
        </React.Suspense>
      </ErrorBoundary>
    </AuthProvider>
  </main>
  )
}

function EnsureLogin() {
  const [session] = useAuth();
  const currentLocation = useLocation().pathname;
  if (!session) {
    return <Redirect to={{
      pathname: "/login",
      state: { referrer: currentLocation }
    }} />
  }
  return null;
}

function Login() {
  const [session] = useAuth();
  const location = useLocation();
  const state = location.state || {};
  console.log(state);
  if (!session) {
    return <LoginButton />
  }
  if (state.referrer) {
    return <Redirect to={state.referrer} />
  }
  return <Redirect to={'/'} />
}

function App() {
  return (
    <Router>
      <PageContainer>
          <EnsureLogin />
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/boards/:boardId">
              <Board />
            </Route>
            <Route path="/boards/:boardOwner/:boardName">
              <Board />
            </Route>
            <Route path="/login" render={() => <Login/>}/>
          </Switch>
      </PageContainer>
    </Router>
  );
}

export default App;
