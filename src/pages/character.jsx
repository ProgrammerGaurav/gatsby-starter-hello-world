import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Character = ({ location }) => {
  const data = useStaticQuery(graphql`
    {
      example {
        id
        characters {
          id
          image
          name
          gender
          species
          status
          type
          location {
            name
          }
          origin {
            name
          }
        }
      }
    }
  `)
  const params = new URLSearchParams(location.search)
  const id = params.get("id")
  const character = data.example.characters.find(c => c.id === parseInt(id))
  if (character === undefined) {
    window.location = "/"
  }
  return (
    <div className="character">
      <img src={character.image} alt="" />
      <h1>{character.name}</h1>
      <div className="info">
        <div>Gender</div>
        <div>{character.gender}</div>
      </div>
      <div className="info">
        <div>Species</div>
        <div>{character.species}</div>
      </div>
      <div className="info">
        <div>Status</div>
        <div>{character.status}</div>
      </div>
      <div className="info">
        <div>Origin</div>
        <div>{character.origin.name}</div>
      </div>
      <div className="info">
        <div>location</div>
        <div>{character.location.name}</div>
      </div>
    </div>
  )
}

export default Character
