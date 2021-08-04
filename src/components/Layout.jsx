import React from "react"
import Navbar from "./Navbar"
import "../scss/style.css"
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
