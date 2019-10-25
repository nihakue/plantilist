import React from 'react';
import { Link } from 'react-router-dom'
import { useBoards } from './pinterest';

function Boards({boards, getNext}) {
  return (
    <>
      <ul>
          {boards.map(({id, name}) => {
            return (
              <li key={id}><Link to={`/boards/${id}`}>{name}</Link></li>
            );
          })}
      </ul>
      {typeof getNext === 'function' && <button onClick={getNext}>more</button>}
    </>
  )
}

function Error({response}) {
  if (!response.error) {
    return null;
  }

  return <p>There was an error retrieving your boards. Please try again</p>;
}

export function Landing() {
  const {response, next} = useBoards();
  const {data} = response;
  const boards = data || [];

  return (
    <div>
      <h1>Your Boards</h1>
      <Error response={response} />
      {!(response.data || response.error) && <p>Loading...</p>}
      <Boards boards={boards} getNext={next}/>
      <hr />
      <details>
        <summary>Privacy Policy</summary>
        <p>Plantilist does not store any of your data, and does not use any storage at all other than what the Pinterest javascript SDK uses for session tracking</p>
        <p>We do, however, gain access to your public pins and boards when you authorize Plantilist with Pinterest. We do not send this data anywhere, and it is only ever used in the app.</p>
        <p>You can view the Plantilist source code <a href="https://github.com/nihakue/plantilist">here</a></p>
      </details>
      <div>
        <a href="javascript:(function(){if (!window.location.host.includes('pinterest')) {return;}const path = window.location.pathname;if (path.split('/').length === 4) {window.location.href = `https://plantilist.club${path}`;}})();">Plantilist It</a><span> -- Drag this link into your bookmarks bar and click on it when you're viewing a board in pinterest to load it in Plantilist!</span>
      </div>
    </div>
  )
}
