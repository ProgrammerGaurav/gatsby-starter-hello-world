import React from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"

const Home = () => {
  return (
    <Layout>
      <div className="landing">
        <div className="landing__card">
          <h1>Rick and Morty API</h1>
          <Link to="/page/1">
            <div className="landing__btn">Visit</div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Home
