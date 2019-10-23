import { mount, route } from 'navi'
import { Router, View } from 'react-navi'
import React from 'react';
import ErrorBoundary from 'react-error-boundary';
import './App.css';
import { AuthProvider, LoginButton } from './PinterestAuth';
import { Landing } from './Landing';
import { Board } from './Board';
import { getBoards, getPins } from './pinterest';

const routes =
  mount({
    '/': route({
      title: "Plantilist",
      getData: () => getBoards(),
      view: <Landing />,
    }),
    '/boards/:boardId': route({
      async getView(request) {
        const pins = await getPins(request.params.boardId);
        return <Board pins={pins} />
      }
    })
  })

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
        {children}
      </ErrorBoundary>
      <LoginButton />
    </AuthProvider>
  </main>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router routes={routes}>
        <PageContainer>
          <React.Suspense fallback={"loading..."}>
            <View />
          </React.Suspense>
        </PageContainer>
      </Router>
    </AuthProvider>
  );
}

export default App;
