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
        typeName: "GitHub",
        fieldName: "github",
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `bearer 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`, // here
        },
        fetchOptions: {},
      },
    },
  ],
}
