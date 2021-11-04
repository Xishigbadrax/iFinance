import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01'
import ModalSimple from '@solid-ui-blocks/Modal/Block02'

import Hero from '@solid-ui-blocks/Hero/Block02'
import ContentOne from '@solid-ui-blocks/Content/Block01'
import ContentTwo from '@solid-ui-blocks/Features/Block06'
import Footer from '@solid-ui-blocks/Footer/Block01'
import Team from '@solid-ui-blocks/Teams/Block02'
import { normalizeBlockContentNodes } from '@blocks-helpers'
import Header from '../../components/header';

const AboutUs02 = props => {
  const { allBlockContent } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)

  return (
    <Layout {...props}>
      <Seo title='Home' />
      {/* Modals */}
     
      {/* Blocks */}
      <Header />
      <div style={{marginTop: "100px"}}>Dashboard huudas</div>
      <Footer content={content['footer']} />
    </Layout>
  )
}

export const query = graphql`
  query innerpageAboutUs02BlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/about-us-02", "shared"] } }
    ) {
      nodes {
        ...BlockContent
      }
    }
  }
`

export default AboutUs02
