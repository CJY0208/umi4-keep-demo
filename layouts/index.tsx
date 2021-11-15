import React from 'react'
import { Link, Outlet } from 'umi'
import KeepOutlets from '../components/KeepOutlets'

export default function Layout() {
  return (
    <div>
      <h2>global layout</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">/users</Link>
        </li>
        <li>
          <Link to="/users/foo">/users/foo</Link>
        </li>
        <li>
          <Link to="/users/bar">/users/bar</Link>
        </li>
        <li>
          <Link to="/settings">/settings</Link>
        </li>
      </ul>
      <KeepOutlets />
      {/* <Outlet /> */}
    </div>
  )
}
