import React from "react"
import Layout from "../components/Layout"

const CharacterTemplate = ({ pageContext }) => {
  const character = pageContext.character
  return (
    <Layout>
      <div className="character-card">
        <img src={character.image} alt="" />
        <h1>{character.name}</h1>
        <div className="character-card__info">
          <div>Gender</div>
          <div>{character.gender}</div>
        </div>
        <div className="character-card__info">
          <div>Species</div>
          <div>{character.species}</div>
        </div>
        <div className="character-card__info">
          <div>Status</div>
          <div>{character.status}</div>
        </div>
        <div className="character-card__info">
          <div>Origin</div>
          <div>{character.origin.name}</div>
        </div>
        <div className="character-card__info">
          <div>location</div>
          <div>{character.location.name}</div>
        </div>
      </div>
    </Layout>
  )
}

export default CharacterTemplate
