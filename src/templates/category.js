import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { search } from "../utils";

const CategoryPage = ({ pageContext }) => {
    return (
        <Layout>
            <SEO title={pageContext.search} />
            <h2>{`${pageContext.search} Recipes`}</h2>
            {
                search(pageContext.recipes, pageContext.search)
            }
        </Layout>
    )
}

export default CategoryPage
