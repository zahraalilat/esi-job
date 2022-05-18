import React from 'react'
import { Link } from 'react-router-dom'
import Meta from '../utils/Meta'

const ErrorScreen = () => {
  return (
    <>
      <Meta pageName={`ESI-JOB | 404`} />
      <section className='error'>
          <div className="main-error-content">
            <span>404!</span>
            <p className="title">Ooops, page not found</p>
            <p className="desc">We are very sorry for the inconvenience. It looks like you're trying to access a page that has been deleted or never even existed.</p>
            <Link to='/' className='back-link'>Back to homepage</Link>
          </div>
      </section>
    </>
  )
}

export default ErrorScreen