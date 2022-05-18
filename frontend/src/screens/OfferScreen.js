import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'  
import { getOffer, offerNewStudent, publicOffer } from '../actions/offerActions'
import Sidebar from '../components/Sidebar'
import { determineMonth } from '../utils/determineMonth'
import { MdWorkOutline, MdWork } from 'react-icons/md'
import { BsChevronLeft, BsCheck2 } from 'react-icons/bs'
import Message from '../components/Message'
import createMarkup from '../utils/DOMSanitizer'
import { OFFER_ADD_STUDENT_RESET, OFFER_ALL_RESET, OFFER_PUBLIC_RESET } from '../constants/offerConstants'
import Messanger from '../components/Messanger'
import Meta from '../utils/Meta'

const OfferScreen = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const tab = location.state?.tab

    // company information
    const [companyId, setCompanyId] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [companyImage, setCompanyImage] = useState('')
    const [companyEmail, setCompanyEmail] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [companySite, setCompanySite] = useState('')
    const [companyPostalAddress, setCompanyPostalAddress] = useState('')

    // offer information
    const [offerName, setOfferName] = useState('')
    const [offerDesc, setOfferDesc] = useState('')
    const [offerPlace, setOfferPlace] = useState('')
    const [offerStartDate, setOfferStartDate] = useState('')
    const [offerEndDate, setOfferEndDate] = useState('')
    const [offerNeededSkills, setOfferNeededSkills] = useState('')
    const [offerCreatedAt, setOfferCreatedAt] = useState('')
    const [offerApplicants, setOfferApplicants] = useState([])
    const [offerIsPublic, setOfferIsPublic] = useState(false)
    const [offerAccepted, setOfferAccepted] = useState([])

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const offerGet = useSelector(state => state.offerGet)
    const { loading, error, offer } = offerGet

    const offerAddStudent = useSelector(state => state.offerAddStudent)
    const { success } = offerAddStudent

    const offerPublic = useSelector(state => state.offerPublic)
    const { success: successUpdateToPublic } = offerPublic

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else if (!offer || success || successUpdateToPublic) {
            dispatch(getOffer(id))
        } else {
            setCompanyId(offer.company._id)
            setCompanyName(offer.company.name)
            setCompanyImage(offer.company.image)
            setCompanyEmail(offer.company.email)
            setCompanyAddress(offer.company.address)
            setCompanySite(offer.company.site)
            setCompanyPostalAddress(offer.company.postalAddress)
            setOfferName(offer.name)
            setOfferDesc(offer.desc)
            setOfferPlace(offer.place)
            setOfferStartDate(offer.startDate)
            setOfferEndDate(offer.endDate)
            setOfferNeededSkills(offer.neededSkills)
            setOfferCreatedAt(offer.createdAt)
            setOfferApplicants(offer.appliants)
            setOfferIsPublic(offer.isPublic)
            setOfferAccepted(offer.accepted)
        }
    }, [userInfo, dispatch, navigate, offer, id, success, successUpdateToPublic])

    useEffect(() => {
        if (error) {
            navigate('/profile')
        }
    }, [offer, navigate])

    useEffect(() => {
        if (successUpdateToPublic) {
            dispatch({
                type: OFFER_PUBLIC_RESET,
            })
        }
    }, [successUpdateToPublic])

    useEffect(() => {
        if (success) {
            dispatch({
                type: OFFER_ADD_STUDENT_RESET,
            })
        }
    }, [success])

    const handleUpdateToPublic = () => {
        dispatch(publicOffer(id, true))
        dispatch({
            type: OFFER_ALL_RESET,
        })
    }

  return (
    <section className='offer-details'>
        <Sidebar />
        <Messanger />
        <Meta pageName={offerName} />
        <div className="main-offer-details">
            
                    <div className="offer-blog-parent">
                    <button onClick={() => navigate(tab ? '/positions' : -1, { state: tab })} className='back sbm'>
                        <BsChevronLeft />
                    </button>
                       {loading ? (
                        <div className='skelton-loader' style={{height: '430px'}} />
                       ) : (
                        <div className="offer-blog">
                        {userInfo._id === companyId && (
                            (!offerIsPublic && (
                                <Message text='Your offer is pending approval by admins' success />
                            ))
                        )}
                        {userInfo.isAdmin && (
                            <div className='admin-msg'>
                                {!offerIsPublic && (
                                <>
                                    <Message text='This offer is pending approval by admins' success />
                                    <div className="back" onClick={handleUpdateToPublic}>
                                        <BsCheck2 />
                                    </div>
                                </>
                                )}
                            </div>
                        )}
                            <h1><span>#</span>{offerName}</h1>
                            <div className="heading">
                                <div className="img">
                                    <img src={companyImage==='/images/default-user.png' ? '/images/default-user.png' : `/${companyImage}`} alt={companyName} />
                                </div>
                                <div className="offer-blog-company">
                                    <Link to={`/freelancers/entreprise/${companyId}`} className='link'>{companyName}</Link>
                                    <span className='date'><i className='bold'>published on </i>
                                        {new Date(offerCreatedAt).toDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="offer-body">
                                <div dangerouslySetInnerHTML={createMarkup(offerDesc)} className='editor-text' />
                            </div>
                            <div className="tags">
                                {offerNeededSkills && offerNeededSkills.split(',').map(skill => {
                                    return (
                                        <span className="skill">{skill}</span>
                                    )
                                })}
                            </div>
                        </div>
                       )}
                    </div>
            <div className="other-offers">
                {loading ? (
                    <div className='skelton-loader' style={{height: '170px', marginBottom: '1.5rem'}} />
                ) : (
                    <div className="offer-info">
                    <header className="card-header">
                        Offer details
                    </header>
                    <div className="offer-info-body">
                        <p><strong>Place</strong>{offerPlace}</p>
                        <p><strong>Start Date</strong>
                            <span>
                                {offerStartDate.substr(8, 2)} {determineMonth(offerStartDate.substr(5, 2))} {offerStartDate.substr(0, 4)}
                            </span>
                        </p>
                        <p><strong>End Date</strong>
                            {!(new Date(offerEndDate).getTime() === new Date('2090-01-01').getTime()) ? (
                                <span className={( Date.now() > new Date(offerEndDate).getTime() ) ? 'ended' : 'available'}>
                                    {offerEndDate.substr(8, 2)} {determineMonth(offerEndDate.substr(5, 2))} {offerEndDate.substr(0, 4)}
                                </span>
                            ) : (
                                <span>Not specified</span>
                            )}
                        </p>
                    </div>
                    <div className="buttons" style={userInfo.isCompany ? {gridTemplateColumns: '1fr'} : null}>
                        <button className='light-btn applicants-btn' style={userInfo.isCompany ? {borderRight: 'none'} : null}>
                            {offer && offerApplicants.length} Applicants
                        </button>
                        {!userInfo.isCompany && (
                            <button onClick={() => dispatch(offerNewStudent(id))} className='light-btn' style={(offerApplicants.includes(userInfo._id) || offerAccepted.includes(userInfo._id)) ? {userSelect: 'none', pointerEvents: 'none', color: '#999'} : null}>
                                <span>
                                    {!offerApplicants.includes(userInfo._id) ? <MdWorkOutline className='icon' /> : <MdWork className='icon' />}
                                    {(!offerApplicants.includes(userInfo._id) && !offerAccepted.includes(userInfo._id)) ? 'Apply' : 'Applied'} 
                                </span>
                            </button>
                        )}
                    </div>
                </div>
                )}
                {loading ? (
                    <div className='skelton-loader' style={{height: '170px'}} />
                ) : (
                    <div className="offer-info">
                    <header className="card-header">
                        Company details
                    </header>
                    <div className="offer-info-body">
                        <p className='link'><strong>Email</strong><a href={`mailto:${{companyEmail}}`} rel='noopener'>{companyEmail}</a></p>
                        <p className='address'><strong>Address</strong>{companyAddress}</p>
                        <p><strong>Postal Address</strong>{companyPostalAddress}</p>
                        <p className='link'><strong>Website</strong><a href={`https://${{companySite}}`} rel='noopener'>{companySite}</a></p>
                    </div>
                </div>
                )}
            </div>
        </div>
    </section>
  )
}

export default OfferScreen