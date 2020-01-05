import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"

const byRatingAndName = (a, b) => {
    if (b.rating < a.rating) {
        return -1
    } else if (b.rating > a.rating) {
        return 1
    } else {
        return a.title.localeCompare(b.title)
    }
}

const RecipesPage = () => {
    const data = useStaticQuery(graphql`
    query {
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
            <SEO title="Recipes" />
            {data.allRecipesJson.nodes.sort(byRatingAndName).map(recipe => (
                <Card
                    key={recipe.slug}
                    title={recipe.title}
                    link={`/recipes/${recipe.slug}/`}>
                    <span>{`${recipe.rating}/10`}</span>
                </Card>
            ))}
        </Layout>
    )
}

export default RecipesPage
