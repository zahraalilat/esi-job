import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { BsPlay } from 'react-icons/bs'
import { FaGlobeEurope } from 'react-icons/fa'
import { BiAtom, BiCloudLightRain } from 'react-icons/bi'
import { RiSpaceShipLine } from 'react-icons/ri'
import styled from 'styled-components'
import { rgba } from 'polished'
import Meta from '../utils/Meta'

// const HomeScreenStyled = styled.section`
//     // background: ${({theme}) => theme.bgs.primaryBg};
//     background: ${() => localStorage.getItem('theme')==='dark' ? `url("https://blog.tubikstudio.com/wp-content/uploads/2018/11/images-in-user-interfaces-tubik-blog-article.png")` : "#fff"};
//     background-position: center center;
//     background-repeat: no-repeat;
//     background-size: cover;
//     color: ${({theme}) => theme.colors.mainColor};

//     .main-content {
//         .container {
//             justify-content: ${() => localStorage.getItem('theme')==='dark' ? `center` : `space-between`};
//             .main-text {
//                 width: ${() => localStorage.getItem('theme')==='dark' ? `70%` : `40%`};
//                 text-align: ${() => localStorage.getItem('theme')==='dark' ? `center` : `left`};

//                 p {
//                     text-align: ${() => localStorage.getItem('theme')==='dark' ? `center` : `left`};
//                     max-width: ${() => localStorage.getItem('theme')==s='light' && `90%`};
//                 }

//                 .links {
//                     justify-content: ${() => localStorage.getItem('theme')==='dark' ? `center` : ``};
//                 }
//             }
//         }
//     }

//     @media (max-width: 764px) {
//         .main-content {
//             .container {
//                 .main-text {
//                     margin: 0 auto;
//                     width: 100%;
//                     text-align: left;

//                      p {
//                          text-align: left;
//                      }

//                      .links {
//                          justify-content: flex-start;
//                      }
//                 }
//             }
//         }
//     }

//     p {
//         color: ${({theme}) => rgba(theme.colors.mainColor, 0.6)};
//     }

//     .special-btn {
//         border-color: ${({theme}) => theme.colors.borderColor};
//     }

//     .overlay {
//         display: ${() => localStorage.getItem('theme')==='light' && 'none'};
//     }

//     .circle {
//         border-color: ${({theme}) => rgba(theme.colors.borderColor, 0.03)};

//         &:nth-of-type(1) {
//             border-color: ${({theme}) => rgba(theme.colors.borderColor, 0.05)};
//             opacity: ${() => localStorage.getItem('theme')==='dark' ? `0` : `1`}
//           }

//         &:nth-of-type(2) {
//             border-color: ${({theme}) => rgba(theme.colors.borderColor, 0.08)};
//             opacity: ${() => localStorage.getItem('theme')==='dark' ? `0` : `1`}
//         }
        
//         &:nth-of-type(3) {
//             border-color: ${({theme}) => rgba(theme.colors.borderColor, 0.14)};
//             opacity: ${() => localStorage.getItem('theme')==='dark' ? `0` : `1`}
//         }
        
//         &:nth-of-type(4) {
//             border-color: ${({theme}) => rgba(theme.colors.borderColor, 0.19)};
//             opacity: ${() => localStorage.getItem('theme')==='dark' ? `0` : `1`}
//         }
        
//         &:nth-of-type(5) {
//             border-color: ${({theme}) => rgba(theme.colors.borderColor, 0.22)};
//             opacity: ${() => localStorage.getItem('theme')==='dark' ? `0` : `1`}
//           }
//     }
// `

const HomeScreen = () => {

    const header = useRef(null)
    const main = useRef(null)
    const content = useRef(null)

    useEffect(() => {
        const headerHeight = header.current.getBoundingClientRect().height
        const mainHeight = main.current.getBoundingClientRect().height

        content.current.style.height = `${mainHeight - headerHeight}px`
    }, [])

  return (
    <>
    <section className="main-page" ref={main}>
        <Meta pageName={`ESI-JOB | Home`} />
        {/* <div className="overlay"></div> */}
        <div ref={header}>
            <Header />
        </div>
        {/* <div className="square"></div> */}
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="main-content">
            <div className="container" ref={content}>
                <div className='main-text'>
                    <h1>The place where all the <span>Esiests</span> work</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ipsam fugiat adipisci fuga odio natus ipsa illum omnis incidunt dolores.</p>
                    <div className='links'>
                        <Link to='/register' className='special-btn'>Get started</Link>
                        <Link to='/faq' className='special-btn'>
                            <BsPlay className='icon' />    
                            How to?
                        </Link>
                    </div>
                </div> 
                <img src="/main.png" alt="main picture" />
            </div>
        </div>    
    </section>

    <section className="what-we-offer">
        <span>The quickest job offers</span>
        <h1>What Numbers Say About <i>Esi Job</i></h1>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="container">
            <div className="grids">
                <div>
                    <i className='icon'>
                        <RiSpaceShipLine/>
                    </i>
                    <h2>Be Always In Touch</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, dolores.</p>
                </div>
                <article>
                <div>
                    <i className='icon'>
                        <FaGlobeEurope />
                    </i>
                    <h2>Trusted by hundreds of business Owners</h2>
                </div>
                <div>
                    <i className='icon'>
                        <BiAtom />
                    </i>
                    <h2>Students using our website</h2>
                </div>
                </article>
                <div>
                    <i className='icon'>
                        <BiCloudLightRain />
                    </i>
                    <h2>Track Your Progress And Leave A Trace Behind</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, recusandae?</p>
                </div>
            </div>
        </div>    
    </section>
    </>
  )
}

export default HomeScreen