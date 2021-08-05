import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import "../scss/style.css"
import LoadingImg from "../../static/loading.gif"

const Characters = ({ characters }) => {
  return (
    <>
      <div className="home">
        {characters.length > 0 ? (
          characters.map(character => (
            <div key={character.id} className="container">
              <Profile character={character} />
            </div>
          ))
        ) : (
          <h3>Character Not Found</h3>
        )}
      </div>
    </>
  )
}

const Profile = ({ character }) => {
  return (
    <Link to={`/character/${character.id}`}>
      <div className="profile-card">
        <div className="profile-card__image">
          <img src={character.image} alt="" />
        </div>
        <div className="profile-card__text">
          <div className="profile-card__text__name">{character.name}</div>
          <div>Species : {character.species}</div>
          <div>Origin : {character.origin.name}</div>
          <div>Gender : {character.gender}</div>
        </div>
      </div>
    </Link>
  )
}

export default Characters
