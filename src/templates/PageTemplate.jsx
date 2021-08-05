import React, { useState } from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { request, gql } from "graphql-request"
import { FaTimes } from "react-icons/fa"
const PageTemplate = ({ data, pageContext }) => {
  const { page, totalPages } = pageContext
  const [characters, setCharacters] = useState(
    data.rickandmortyapi.characters.results
  )
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(false)

  const updateCharacters = () => {
    setLoading(true)

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
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setCharacters([])
        setLoading(false)
      })
  }
  return (
    <Layout>
      <div className="search-bar">
        <div className="search-bar__inputbox">
          <input
            className="search-bar__inputbox__input"
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
          {searchText !== "" ? (
            <FaTimes
              className="search-bar__inputbox__close-icon"
              onClick={() => {
                setSearchText("")
                setCharacters(data.rickandmortyapi.characters.results)
              }}
            />
          ) : null}
        </div>
        <div className="search-bar__button" onClick={updateCharacters}>
          Search
        </div>
      </div>
      <div className="home">
        {loading ? (
          <div className="loading">
            <img src="/loading.gif" alt="" className="loading__img" />
          </div>
        ) : characters.length > 0 ? (
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
              pageNo + 1 === page && characters.length > 0 && searchText === ""
                ? "pagination__pgnumber pagination__selected"
                : "pagination__pgnumber"
            }
            onClick={() => {
              if (pageNo + 1 === page) {
                setCharacters(data.rickandmortyapi.characters.results)
                setSearchText("")
              }
            }}
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
