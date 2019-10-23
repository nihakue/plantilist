import React from 'react';
import {
  useParams
} from "react-router-dom";
import { usePins } from './pinterest';
import './Board.css';

function Pin({pin}) {
  return (
    <div className={"brick"}>
      <h3>{pin.note || ""}</h3>
      <img alt={pin.note} src={pin.image.original.url}></img>
    </div>
  )
}

export function Board() {
  const {boardId, boardOwner, boardName} = useParams();
  const boardIdentifier = boardId || `${boardOwner}/${boardName}`;
  const {response} = usePins(boardIdentifier);
  if (!response.reduce) {
    return null;
  }
  console.log(response);
  const pins = response.reduce((acc, curr) => [...acc, ...(curr.data || [])], [])

  return (
  <div className={"grid"}>
    {pins.map(pin => <Pin key={pin.id} pin={pin} />)}
  </div>
  )
}