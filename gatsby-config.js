module.exports = {
  pathPrefix: "/gatsby-starter-hello-world",
  siteMetadata: {
    title: "My First Gatsby Site",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "rickandmortyapi",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "rickandmortyapi",
        // Url to query from
        url: "https://rickandmortyapi.com/api/character",
      },
    },
  ],
}
