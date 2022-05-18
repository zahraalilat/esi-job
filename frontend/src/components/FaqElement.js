import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { BiPlus, BiMinus } from 'react-icons/bi'

const FaqElement = ({ question, content}) => {
    const [active, setActive] = useState(false)

    const contentHeightRef = useRef()

    useEffect(() => {
        if (active) {
            // contentHeightRef.current.style.maxHeight = `max-content`
            contentHeightRef.current.style.opacity = `1`
            contentHeightRef.current.style.fontSize = `1rem`
            contentHeightRef.current.style.padding = `0 1.3rem 1.3rem 1.3rem`
            contentHeightRef.current.style.transition = `opacity 0.3s ease-in, font-size 0.1s ease`
        } else {
            // contentHeightRef.current.style.maxHeight = `0`
            contentHeightRef.current.style.opacity = `0`
            contentHeightRef.current.style.fontSize = `0`
            contentHeightRef.current.style.padding = `0 1.3rem 0 1.3rem`
            contentHeightRef.current.style.transition = `opacity 0.3s ease-in, font-size 0.1s ease`
        }
    }, [active])

  return (
    <article>
        <div className="heading" onClick={() => setActive(!active)}>
            <p className="title">
                {question}
            </p>
            <span>
                {!active ? (
                    <BiPlus className='icon' />
                    ) : (
                    <BiMinus className='icon' />
                )}
            </span>
        </div>
        <div className="content" ref={contentHeightRef}>
            <p>
                {content}
            </p>
        </div>
    </article>
  )
}

export default FaqElement