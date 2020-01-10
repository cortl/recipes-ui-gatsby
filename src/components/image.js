import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({ className }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "chef.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Img
      placeholderClassName="w3"
      className="w3"
      style={{
        marginRight: "auto",
        marginLeft: "auto",
      }}
      fluid={data.placeholderImage.childImageSharp.fluid}
    />
  )
}

export default Image
