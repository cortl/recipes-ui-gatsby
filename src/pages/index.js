import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Search from "../components/search"

const toSearch = ({ slug, title, rating }) => ({
  url: `recipes/${slug}`,
  key: title,
  title,
  rating,
  value: `${title} - ${rating}/10`
});

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query RecipeQuery {
      allRecipesJson {
        nodes {
          slug
          title
          rating
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <div
        style={{
          maxWidth: `200px`,
          marginBottom: `1.45rem`,
          marginRight: `auto`,
          marginLeft: `auto`,
        }}
      >
        <Image />
      </div>
      <Search data={data.allRecipesJson.nodes.map(toSearch)} />
    </Layout>
  )
}

export default IndexPage
