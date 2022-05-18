import React from 'react'
import { BsShieldExclamation } from 'react-icons/bs'

const Message = ({ text, success }) => {
  return (
    <article className={`message ${success && 'success'}`}>
        <BsShieldExclamation className='icon' />
        {text}
    </article>
  )
}

export default Message