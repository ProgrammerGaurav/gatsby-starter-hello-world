import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { request, gql } from "graphql-request"
import { FaTimes } from "react-icons/fa"
import LoadingImg from "../../static/loading.gif"
import Characters from "../components/Characters"

const PageTemplate = ({ data, pageContext }) => {
  const [characters, setCharacters] = useState(
    data.rickandmortyapi.characters.results
  )
  const [totalpage, setTotalpage] = useState(
    data.rickandmortyapi.characters.info.pages
  )
  const [currentPage, setCurrentPage] = useState(pageContext.page)
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchMode, setSearchMode] = useState(false)
  const updateCharacters = () => {
    setSearchMode(true)
    if (searchText === "") {
      return
    }
    setLoading(true)

    const variables = {
      name: searchText,
      page: currentPage,
    }
    const query = gql`
      query myQuery($name: String!, $page: Int!) {
        characters(filter: { name: $name }, page: $page) {
          info {
            pages
            prev
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
        console.log(data.characters.info.prev)
        setCharacters(data.characters.results)
        setTotalpage(data.characters.info.pages)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setCharacters([])
        setLoading(false)
      })
  }

  useEffect(() => {
    updateCharacters()
  }, [currentPage])
  return (
    <Layout>
      <div className="search-bar">
        <div className="search-bar__inputbox">
          <input
            className="search-bar__inputbox__input"
            type="text"
            placeholder="Search"
            value={searchText}
            onKeyDown={e => {
              if (e.key === "Enter") {
                currentPage === 1 ? updateCharacters() : setCurrentPage(1)
              }
            }}
            onChange={e => {
              setSearchMode(false)
              if (e.target.value === "") {
                setCharacters(data.rickandmortyapi.characters.results)
              }
              setSearchText(e.target.value)
            }}
          />
          {searchText !== "" ? (
            <Link to="/page/1">
              <FaTimes
                className="search-bar__inputbox__close-icon"
                onClick={() => {
                  setSearchText("")
                  setSearchMode(false)
                  setCurrentPage(pageContext.page)
                  setCharacters(data.rickandmortyapi.characters.results)
                  setTotalpage(data.rickandmortyapi.characters.info.pages)
                }}
              />
            </Link>
          ) : null}
        </div>
        <div className="search-bar__button" onClick={updateCharacters}>
          Search
        </div>
        {loading ? (
          <div className="loading">
            <img src={LoadingImg} alt="" className="loading__img" />
          </div>
        ) : (
          <Characters characters={characters} />
        )}
        {loading ? (
          ""
        ) : characters.length > 0 ? (
          <div className="pagination">
            {[...Array(totalpage)].map((_, pageNo) => (
              <Link
                to={`/page/${pageNo + 1}`}
                key={pageNo}
                className={
                  pageNo + 1 === currentPage && characters.length > 0
                    ? "pagination__pgnumber pagination__selected"
                    : "pagination__pgnumber"
                }
                onClick={e => {
                  if (searchText !== "" && searchMode) {
                    e.preventDefault()
                    setCurrentPage(pageNo + 1)
                  }
                }}
              >
                <div>{pageNo + 1}</div>
              </Link>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </Layout>
  )
}

export default PageTemplate
export const query = graphql`
  query ($page: Int!) {
    rickandmortyapi {
      characters(page: $page) {
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
  }
`
