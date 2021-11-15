import React from 'react'
import Counter from '../../components/Counter'
import { useKeepControl } from '../../components/KeepOutlets'

export default () => {
  const { drop } = useKeepControl()

  return (
    <>
      <h2>
        user: Bar <Counter />
      </h2>
      <button
        onClick={() => {
          drop('/users')
        }}
      >
        drop /users
      </button>
      <button
        onClick={() => {
          drop('/users/foo')
        }}
      >
        drop /users/foo
      </button>
      <button
        onClick={() => {
          drop('/users/bar')
        }}
      >
        drop /users/bar
      </button>
    </>
  )
}
