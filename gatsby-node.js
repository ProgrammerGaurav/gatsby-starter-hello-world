const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`src/templates/PageTemplate.jsx`)
  const characterTemplate = path.resolve(`src/templates/CharacterTemplate.jsx`)

  const data = await graphql(`
    query MyQuery {
      rickandmortyapi {
        characters {
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
  `)
  const totalPages = data.data.rickandmortyapi.characters.info.pages
  for (let page = 1; page <= totalPages; page++) {
    createPage({
      path: `/page/${page}`,
      component: pageTemplate,
      context: {
        page,
        totalPages,
      },
    })
    const characterdata = await graphql(`
      query MyQuery {
        rickandmortyapi {
          characters(page: ${page}) {
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
    `)

    characterdata.data.rickandmortyapi.characters.results.map(character => {
      createPage({
        path: `/character/${character.id}`,
        component: characterTemplate,
        context: {
          character,
        },
      })
    })
  }
}
