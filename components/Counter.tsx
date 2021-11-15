import React from 'react'

export default function Counter() {
  const [count, setCount] = React.useState(0)

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount((count) => count + 1)}>Add</button>
    </div>
  )
}
