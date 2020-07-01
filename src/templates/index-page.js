import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Banner from '../components/Banner'
import About from '../components/About'
import Header from '../components/Header'
import Activities from '../components/Activities'
import Tinnewerck from '../components/Tinnewerck'
import pot from '../img/teaser.jpg'

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const Wrapper = styled.div`
  color: #40544e;
  margin-bottom: 500px;
  position: relative;
  background-color: #fff;
`
const TeaserContainer = styled.div`
  margin: 55px 0;
  height: 55vh;
`
const Teaser = styled.div`
  position: relative;
  background-image: url(${pot});
  background-size: cover;
  background-position: 50% 50%;
  height: 55vh;
  width: 100%;
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: linear-gradient(
    to bottom,
    rgba(48, 49, 51, 0),
    rgb(12, 13, 13)
  );
  background-image: linear-gradient(to bottom, rgba(48, 49, 51, 0), #27282b);
`

const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  bottom: -25px;
  margin: auto;
  left: 0;
  right: 0;
  background: #8d986e;
  border: 2px solid #fff;
`

export const IndexPageTemplate = ({ image, title, about, tinnewerck }) => {
  const triggerRef = useRef(null)
  const imageRef = useRef(null)
  useEffect(() => {
    gsap.from(imageRef.current, {
      scaleX: 0.9,
      backgroundPosition: '50% 0%',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.1,
      },
    })
  }, [])

  return (
    <Wrapper>
      <Header title={title} image={image} />

      <About
        heading={about.heading}
        content={about.content}
        image={about.image}
      />
      <TeaserContainer ref={triggerRef}>
        <Teaser ref={imageRef}>
          <Overlay />
        </Teaser>
      </TeaserContainer>

      <Activities />
      <Banner />
      <Tinnewerck
        heading={tinnewerck.heading}
        content={tinnewerck.content}
        image={tinnewerck.image}
      />
      <Button aria-label='top'>
        <svg width='24' height='24' fill='#fff'>
          <path d='M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z' />
        </svg>
      </Button>
    </Wrapper>
  )
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        about={frontmatter.about}
        tinnewerck={frontmatter.tinnewerck}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainpitch {
          title
          description
        }
        description
        about {
          heading
          content
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        tinnewerck {
          heading
          content
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
