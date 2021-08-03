import React from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

export default function Home({ id }) {
  const data = useStaticQuery(graphql`
    {
      example {
        id
        characters {
          id
          image
          name
          species
          gender
          origin {
            name
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <div className="home">
        {data.example.characters.map(character => (
          <div key={character.id} className="container">
            <Link to={`/character?id=${character.id}`}>
              <div className="profile">
                <div className="image">
                  <img src={character.image} />
                </div>
                <div className="text">
                  <div className="name">{character.name}</div>
                  <div className="gender">Species : {character.species}</div>
                  <div className="gender">Origin : {character.origin.name}</div>
                  <div className="gender">Gender : {character.gender}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}
