const fetch = require(`node-fetch`)

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get data from GitHub API at build time
  const result = await fetch(`https://rickandmortyapi.com/api/character`)
  const resultData = await result.json()
  // create node for build time data example in the docs
  createNode({
    // nameWithOwner and url are arbitrary fields from the data
    characters: resultData.results,
    id: `example-build-time-data`,
    parent: null,
    children: [],
    internal: {
      type: `Example`,
      contentDigest: createContentDigest(resultData),
    },
  })
}
