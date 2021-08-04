import React from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import { graphql } from "gatsby"

const PageTemplate = ({ data, pageContext }) => {
  const { page, totalPages } = pageContext
  return (
    <Layout>
      <div className="search-bar">
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search"
          //   value={page}
        />
      </div>
      <div className="home">
        {data.rickandmortyapi.characters.results.map(character => (
          <div key={character.id} className="container">
            <Profile character={character} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {page > 1 ? (
          <Link to={`/page/${page - 1}`}>
            <div className="pagination__button">Previous</div>
          </Link>
        ) : null}
        {page > 1 ? <div className="pagination__pgnumber">{page}</div> : null}

        {page < totalPages ? (
          <Link to={`/page/${page + 1}`}>
            <div className="pagination__button">Next</div>
          </Link>
        ) : null}
      </div>
    </Layout>
  )
}

const Profile = ({ character }) => {
  return (
    <Link to={`/${character.id}`}>
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

export default PageTemplate
export const query = graphql`
  query ($page: Int!) {
    rickandmortyapi {
      characters(page: $page) {
        results {
          name
          gender
          id
          image
          location {
            name
          }
          origin {
            name
          }
          species
          status
        }
      }
    }
  }
`
