import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Artist } from  "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const MoviesPage = () => {
  const {
    wpcontent: {
      page: {
        Moev: { kleineBeschrijvingCopy, bannerFotoCopy },
      },
      movies: { edges: movies },
    },
  } = useStaticQuery(graphql`

  query  {
    wpcontent {
      page(id: "movies", idType: URI) {
        Moev {
          kleineBeschrijvingCopy
          bannerFotoCopy {
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            altText
          }
        }
      }
      movies {
        edges {
          node {
            slug
            movie {
              title
              year
              director
              language
              description
              company
              review
              cover {
                altText
                sourceUrl
                imageFile {
                      childImageSharp {
                        fluid(quality: 50) {
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                 altText
              }
            }
          }
        }
      }
    }
  }

  `)
  return (
    <Layout>
      <SEO title="Movies" />
      <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.PRIMARY}>
        <div className="banner">
          <Image fluid={bannerFotoCopy.imageFile.childImageSharp.fluid} alt={bannerFotoCopy.altText} />
          <BottomEdgeDown color={COLORS.PRIMARY} />
        </div>
        <div className="description">
          <h2>We are Movie Agency</h2>
          <p>{kleineBeschrijvingCopy}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="artists">
          <h2>Our Movies</h2>
          <div className="artist-items">
            {movies.map(({ node: {movie, slug}, i}) => {
              return (
                <Artist to={`/${slug}`} key={i}>
                  <Image fluid={movie.cover.imageFile.childImageSharp.fluid} alt={movie.cover.altText} />
                  <div className="artist-info">
                    <p>{movie.title}</p>
                    <p>{`Released: ${movie.year}`}</p>
                  </div>
                </Artist>
              )
            })}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default MoviesPage