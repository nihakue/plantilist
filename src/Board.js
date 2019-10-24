import React from 'react';
import {
  useParams
} from "react-router-dom";
import { usePins } from './pinterest';
import { Masonry } from './Masonry';
import './Board.css';

function Pin({pin}) {
  return (
    <div className={"grid-brick"}>
      <img alt={pin.note} src={pin.image.original.url}></img>
      <h4>{pin.note || ""}</h4>
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
  const pins = response.reduce((acc, curr) => [...acc, ...(curr.data || [])], [])

  return (
  <Masonry gap={'1.2rem'}>
    {pins.map(pin => <Pin key={pin.id} pin={pin} />)}
  </Masonry>
  )
}