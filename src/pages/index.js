import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Search from "../components/search"
import Card from "../components/card"

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
          image
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
      {['Beef', 'Chicken', 'Pork', 'Turkey', 'Pasta'].map(category => (
        <Card
          key={category}
          title={category}
          link={`/${category.toLowerCase()}/`} />
      ))}
      <Card title='All Recipes' link={`/recipes`} />
    </Layout>
  )
}

export default IndexPage
