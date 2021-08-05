module.exports = {
  pathPrefix: "/rick-and-morty-api-gatsby",
  siteMetadata: {
    title: "My First Gatsby Site",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "rickandmortyapi",
        fieldName: "rickandmortyapi",
        url: "https://rickandmortyapi.com/graphql",
      },
    },
  ],
}
