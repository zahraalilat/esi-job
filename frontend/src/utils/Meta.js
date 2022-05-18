import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ pageName }) => {
  return (
    <Helmet>
        <title>{pageName}</title>
    </Helmet>
  )
}

export default Meta