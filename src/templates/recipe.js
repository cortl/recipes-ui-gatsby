import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ pageContext }) => {
  return (
    <Layout>
      <SEO title={pageContext.title} />
      <h1>{`${pageContext.title} - ${pageContext.rating}/10`}</h1>
      <h4>
        {`Adapted from `}
        <a href={pageContext.source}>here</a>
      </h4>
      {pageContext.notes.filter(Boolean).length ? (
        <section>
          <h2>{`Notes`}</h2>
          <ul>
            {pageContext.notes.map((note, i) => (
              <li key={`notes${i}`}>{note}</li>
            ))}
          </ul>
        </section>
      ) : (
        <></>
      )}
      <section>
        <h2>{`Ingredients`}</h2>
        <ul>
          {pageContext.ingredients.map(ingredient => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>{`Instructions`}</h2>
        <ol>
          {pageContext.instructions.map((instruction, i) => (
            <li key={`instruction${i}`}>{instruction}</li>
          ))}
        </ol>
      </section>
    </Layout>
  )
}
