import React from 'react'
import Layout from '../Components/Layout'

const withLayout = WrappedComponents => props => (
  <Layout>
    <WrappedComponents {...props} />
  </Layout>
)


export default withLayout