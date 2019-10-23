import React from 'react';
import { Link, useCurrentRoute } from 'react-navi'

export function Landing() {
  const {data: boards} = useCurrentRoute();
  console.log('boards', boards);
  return (
  <div>
    <ul>
      {boards.data.map(({id, name}) => <li key={id}><Link href={`/boards/${id}`}>{name}</Link></li>)}
    </ul>
    <details>
      <summary>Privacy Policy</summary>
      <p>Plantilist does not store any of your data, and does not use any storage at all other than what the Pinterest javascript SDK uses for session tracking</p>
      <p>We do, however, gain access to your public pins and boards when you authorize Plantilist with Pinterest. We do not send this data anywhere, and it is only ever used in the app.</p>
      <p>You can view the Plantilist source code <a href="https://github.com/nihakue/plantilist">here</a></p>
    </details>
  </div>
  )
}
