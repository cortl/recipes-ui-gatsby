import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

const Recipe = ({ data, pageContext }) => {
  return (
    <Layout>
      <SEO title={pageContext.title} />
      <h1 className="lh-title">{`${pageContext.title} - ${pageContext.rating}/10`}</h1>
      <h4>
        {`Adapted from `}
        <a className="black dim" href={pageContext.source}>
          here
        </a>
      </h4>
      {data.placeholderImage && (
        <Img fluid={data.placeholderImage.childImageSharp.fluid} />
      )}
      {pageContext.notes.filter(Boolean).length ? (
        <section className="bb">
          <h2>{`Notes`}</h2>
          <ul>
            {pageContext.notes.map((note, i) => (
              <li className="pv2" key={`notes${i}`}>
                {note}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <></>
      )}
      <section className="bb">
        <h2>{`Ingredients`}</h2>
        <ul>
          {pageContext.ingredients.map((ingredient, i) => (
            <li className="pv2" key={`${i}ingredient`}>
              {ingredient}
            </li>
          ))}
        </ul>
      </section>
      <section className="bb" className="">
        <h2>{`Instructions`}</h2>
        <ol>
          {pageContext.instructions.map((instruction, i) => (
            <li className="pv2" key={`instruction${i}`}>
              <span className="lh-copy">{instruction}</span>
            </li>
          ))}
        </ol>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($image: String) {
    placeholderImage: file(relativePath: { eq: $image }) {
      childImageSharp {
        fluid(maxWidth: 960, maxHeight: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Recipe
