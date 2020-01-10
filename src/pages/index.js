import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Search from "../components/search"
import Card from "../components/card"

const toSearch = ({ slug, title, rating }) => ({
  url: `recipes/${slug}`,
  key: title,
  title,
  rating,
  value: `${title} - ${rating}/10`,
})

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query RecipeQuery {
      allRecipesJson {
        nodes {
          slug
          title
          rating
          image
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <Search data={data.allRecipesJson.nodes.map(toSearch)} />
      <div className="center">
        {["Beef", "Chicken", "Pork", "Turkey", "Pasta"].map(category => (
          <Card
            key={category}
            title={category}
            link={`/${category.toLowerCase()}/`}
          />
        ))}
        <Card title="All Recipes" link={`/recipes`} />
      </div>
    </Layout>
  )
}

export default IndexPage
