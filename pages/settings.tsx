import { Outlet } from 'umi'
import React from 'react'
import KeepOutlets from '../components/KeepOutlets'
import Counter from '../components/Counter'

export default () => {
  return (
    <div>
      <h2>settings layout</h2>
      <Counter />
      <KeepOutlets />
      {/* <Outlet /> */}
    </div>
  )
}
