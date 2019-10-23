import React from 'react';
import { Link, useCurrentRoute } from 'react-navi'

export function Landing() {
  const {data: boards} = useCurrentRoute();
  console.log('boards', boards);
  return (
  <ul>
    {boards.data.map(({id, name}) => <li key={id}><Link href={`/boards/${id}`}>{name}</Link></li>)}
  </ul>
  )
}