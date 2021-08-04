import React, { useState } from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { request, gql } from "graphql-request"

const PageTemplate = ({ data, pageContext }) => {
  const { page, totalPages } = pageContext
  const [characters, setCharacters] = useState(
    data.rickandmortyapi.characters.results
  )
  const [searchText, setSearchText] = useState("")

  const updateCharacters = () => {
    const variables = {
      name: searchText,
      page: searchText === "" ? page : 0,
    }
    const query = gql`
      query myQuery($name: String!, $page: Int!) {
        characters(filter: { name: $name }, page: $page) {
          info {
            pages
          }
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
    `

    request("https://rickandmortyapi.com/graphql", query, variables)
      .then(data => {
        setCharacters(data.characters.results)
      })
      .catch(error => {
        console.log(error)
        setCharacters([])
      })
  }
  return (
    <Layout>
      <div className="search-bar">
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={e => {
            if (e.target.value === "") {
              setCharacters(data.rickandmortyapi.characters.results)
            }
            setSearchText(e.target.value)
          }}
        />
        <div className="search-bar__button" onClick={updateCharacters}>
          Search
        </div>
      </div>
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
      <div className="pagination">
        {[...Array(totalPages)].map((_, pageNo) => (
          <Link
            to={`/page/${pageNo + 1}`}
            key={pageNo}
            className={
              pageNo + 1 === page
                ? "pagination__pgnumber pagination__selected"
                : "pagination__pgnumber"
            }
          >
            <div>{pageNo + 1}</div>
          </Link>
        ))}
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
