import React from "react"
import {  useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image, Artist, } from "../pageStyles/pageStyles"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homePageMeta: {
          title,
          bannerFoto,
          kleineBeschrijving,
          featuredFilms,
        },
      },
    },
  } = useStaticQuery(graphql`

  query MyQuery {
    wpcontent {
      page(idType: URI, id: "homepage") {
        homePageMeta {
          kleineBeschrijving
          title
          bannerFoto {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 100){
                 ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          featuredFilms{
            ... on WPGraphql_Movie {
              id
              slug
              movie{
                title
                year
                cover {
                  altText
                  sourceUrl
                  imageFile {
                    childImageSharp {
                      fluid(quality: 100, grayscale: true){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`)
  
              
  return (

    <Layout>
    <SEO title="Home" />

    <Wrapper>
      <div className="banner">
        <Image
          fluid={bannerFoto.imageFile.childImageSharp.fluid}
          alt={bannerFoto.altText}
        />
        <div className="inner-div">
          <p className="header-title">{title}</p>
          <p className="header-description">{kleineBeschrijving}</p>
        </div>
       
      </div>
      <div className="description">
        <p>{kleineBeschrijving}</p>
        
      </div>
      <div className="artists">
        <h2>Featured Movies</h2>
        <div className="artist-items">
          {featuredFilms.map(({ movie, slug }) => (
            <Artist key={slug} to={`/${slug}`}>
               <Image
                fluid={movie.cover.imageFile.childImageSharp.fluid}
                alt={movie.cover.altText}
              />
              
              <div className="artist-info">
                <p>
                  {movie.title}
                </p>
                <p>{movie.year}</p>
              </div>
            </Artist>
          ))}
        </div>
      </div>
    </Wrapper>
 
  </Layout>
 
  )
}

export default IndexPage