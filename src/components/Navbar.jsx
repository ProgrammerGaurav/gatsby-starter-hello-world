import React from "react"
import { Link } from "gatsby"
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">home</Link>
      <Link to="/about">about</Link>
      <Link to="/company">company</Link>
      <Link to="/contact">contact</Link>
    </nav>
  )
}

export default Navbar
