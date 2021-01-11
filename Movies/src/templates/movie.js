import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image } from "./templateStyles/artistStyles"

const MovieTemplate = ({data: {
    wpcontent: {
      movie: {
        movie,
        genres: { edges: genres },
      },
    },
  },
}) => {
//   const { picture1, picture2, picture3 } = artist.pictures
//   const pictures = [picture1, picture2, picture3]

  return (
    <Layout>
      <SEO title="Movie" />
      <Wrapper>
        <div className="artist-container">
          <div className="artist-image">
            <Image
              fluid={movie.cover.imageFile.childImageSharp.fluid}
              alt={movie.cover.altText}
            />
            <div className="roles">
              {genres.map(({ node: genre }) => (
                <div key={genre.name} className="role">
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
          <div className="artist-info">
            <h2>
              {movie.title}
               </h2>

              <p className="description">{movie.description}</p> 
           
              <p className="info">{movie.year}</p>
              <p className="info">{movie.language}</p>
              <p className="info">{movie.company}</p>
              <p className="info">{movie.director}</p>
              <p className="info">{movie.review}</p>
          
            
            
            
          </div>
        </div>
       
      </Wrapper>
    </Layout>
  )
}

export default MovieTemplate

export const pageQuery = graphql`
query($id: ID!) {
    wpcontent {
      movie(id: $id, idType: ID) {
        genres {
          edges {
            node {
              name
            }
          }
        }
        movie {
          title
          description
          language
          company
          year
          director
          review
          cover {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`