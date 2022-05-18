import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ListElement = ({ link='/', text, Icon, active }) => {

  return (
    <li className={active && 'active'}>
        <Link to={`${link}`} className='link'>
            <Icon />
        </Link>
            <p>{text}</p>
    </li>
  )
}

export default ListElement