import React from 'react';
import { Link } from 'react-navi'
import { useBoards } from './pinterest';

export function Landing() {
  const {response, next} = useBoards();
  if (!response || !response.data) {
    return null;
  }
  
  if (response.error) {
    throw response.error || Error("No response data");
  }

  const {data: boards} = response;

  return (
  <div>
    <ul>
      {boards.map(({id, name}) => <li key={id}><Link href={`/boards/${id}`}>{name}</Link></li>)}
    </ul>
    {next && <button onClick={next}>next</button>}
    <details>
      <summary>Privacy Policy</summary>
      <p>Plantilist does not store any of your data, and does not use any storage at all other than what the Pinterest javascript SDK uses for session tracking</p>
      <p>We do, however, gain access to your public pins and boards when you authorize Plantilist with Pinterest. We do not send this data anywhere, and it is only ever used in the app.</p>
      <p>You can view the Plantilist source code <a href="https://github.com/nihakue/plantilist">here</a></p>
    </details>
  </div>
  )
}
