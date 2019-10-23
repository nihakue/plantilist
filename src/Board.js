import React from 'react';
import './Board.css';

function Pin({pin}) {
  return (
    <div className={"brick"}>
      <h3>{pin.note || ""}</h3>
      <img alt={pin.note} src={pin.image.original.url}></img>
    </div>
  )
}

export function Board({pins}) {
  console.log(pins);
  return (
  <div className={"grid"}>
    {pins.map(pin => <Pin id={pin.id} pin={pin} />)}
  </div>
  )
}