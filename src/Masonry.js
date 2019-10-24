import React, { useRef, useState, useEffect } from 'react'

function masonryStyles(props) {
  return {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: props.gap || `1em`,
  }
}

function colStyles(props) {
  return {
    display: 'grid',
    gridGap: props.gap || `1em`,
    gridAutoRows: 'max-content',
  }
}

export function Masonry({ children, gap, minWidth = 250 }) {
  const cols = []
  const ref = useRef()
  const [numCols, setNumCols] = useState(3)

  const calcNumCols = () =>
    setNumCols(Math.floor(ref.current.offsetWidth / minWidth))

  const createCols = () => {
    for (let i = 0; i < numCols; i++) cols[i] = []
    children.forEach((child, i) => cols[i % numCols].push(child))
  }

  useEffect(() => {
    calcNumCols()
    window.addEventListener(`resize`, calcNumCols)
    return () => window.removeEventListener(`resize`, calcNumCols)
  })
  createCols()

  const m = masonryStyles({gap});
  const c = colStyles({gap});
  return (
    <div style={m} ref={ref}>
      {Array(numCols)
        .fill()
        .map((el, i) => (
          <div style={c} key={i}>
            {cols[i]}
          </div>
        ))}
    </div>
  )
}