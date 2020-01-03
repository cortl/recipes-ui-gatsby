import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const byRatingAndName = (a, b) => {
  if (b.rating < a.rating) {
    return -1;
  } else if (b.rating > a.rating) {
    return 1;
  } else {
    return a.title.localeCompare(b.title);
  }
};

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

  console.log(data);
  return (
    <Layout>
      <SEO title="Home" />
      <div style={{ maxWidth: `200px`, marginBottom: `1.45rem`, marginRight: `auto`, marginLeft: `auto` }}>
        <Image />
      </div>
      <h1>Hi!</h1>
      <p>This website is a personal collection of the recipes I've made over my journey of amateur cooking.  I've ranked each recipe, included notes, and the original source.
    </p>
      <h2>Recipes</h2>
      <ul>
        {
          data.allRecipesJson.nodes
            .sort(byRatingAndName)
            .map((node, i) =>
              <li key={`${i}`}><Link to={`recipes/${node.slug}`}>{node.title}</Link> - {node.rating}/10</li>)
        }
      </ul>
    </Layout>
  )
}

export default IndexPage
