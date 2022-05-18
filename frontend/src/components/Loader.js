import React from 'react'
import { CgSpinner } from 'react-icons/cg'

const Loader = ({ additionalClass }) => {
  return (
    <CgSpinner className={`loader ${additionalClass}`} />
  )
}

export default Loader